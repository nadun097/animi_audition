// CV Verification Security Utilities
// Provides secure route protection for CV download functionality

const SECURITY_CONFIG = {
  VERIFICATION_CODE_EXPIRY: 10 * 60 * 1000, // 10 minutes
  MAX_ATTEMPTS_PER_SESSION: 8,
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
}

const STORAGE_KEYS = {
  SESSION: 'cv_verification_session',
  VERIFICATION_STATE: 'cv_verification_state',
  SECURITY_LOG: 'cv_security_log'
}

class CVSecurityManager {
  constructor() {
    this.config = SECURITY_CONFIG
    this.keys = STORAGE_KEYS
  }

  // Generate cryptographically secure verification code
  async generateSecureCode() {
    try {
      const array = new Uint32Array(1)
      crypto.getRandomValues(array)
      return (array[0] % 900000 + 100000).toString()
    } catch (error) {
      // Fallback for environments without crypto API
      console.warn('Crypto API not available, using less secure fallback')
      return Math.floor(100000 + Math.random() * 900000).toString()
    }
  }

  // Hash email for secure storage (not for sensitive data)
  async hashEmail(email) {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(email.toLowerCase().trim())
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    } catch (error) {
      // Fallback hash
      return btoa(email.toLowerCase().trim())
    }
  }

  // Secure storage with encryption-like obfuscation
  secureStore(key, data) {
    try {
      const secureData = {
        data: btoa(JSON.stringify(data)),
        timestamp: Date.now(),
        checksum: this.generateChecksum(data)
      }
      localStorage.setItem(key, JSON.stringify(secureData))
      return true
    } catch (error) {
      console.error('Secure storage failed:', error)
      return false
    }
  }

  // Secure retrieval with validation
  secureRetrieve(key) {
    try {
      const stored = localStorage.getItem(key)
      if (!stored) return null

      const secureData = JSON.parse(stored)
      const now = Date.now()

      // Check if data is expired
      if (secureData.timestamp && (now - secureData.timestamp) > this.config.SESSION_TIMEOUT) {
        localStorage.removeItem(key)
        return null
      }

      // Validate checksum
      const data = JSON.parse(atob(secureData.data))
      if (this.generateChecksum(data) !== secureData.checksum) {
        console.warn('Data integrity check failed, clearing corrupted data')
        localStorage.removeItem(key)
        return null
      }

      return data
    } catch (error) {
      console.error('Secure retrieval failed:', error)
      localStorage.removeItem(key)
      return null
    }
  }

  // Generate simple checksum for data integrity
  generateChecksum(data) {
    const str = JSON.stringify(data)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(36)
  }

  // Check if email is rate limited
  // Check session rate limiting
  isSessionRateLimited() {
    const sessionData = this.secureRetrieve(this.keys.SESSION)
    return sessionData && sessionData.attempts >= this.config.MAX_ATTEMPTS_PER_SESSION
  }

  // Update session attempts
  updateSessionAttempts() {
    const sessionData = this.secureRetrieve(this.keys.SESSION) || {}
    const newAttempts = (sessionData.attempts || 0) + 1

    this.secureStore(this.keys.SESSION, {
      ...sessionData,
      attempts: newAttempts,
      lastAttempt: Date.now()
    })

    return newAttempts
  }

  // Store verification state securely
  storeVerificationState(email, code, expiry) {
    const state = {
      emailHash: this.hashEmail(email),
      code: this.simpleEncrypt(code),
      expiry: expiry,
      timestamp: Date.now()
    }

    return this.secureStore(this.keys.VERIFICATION_STATE, state)
  }

  // Retrieve and validate verification state
  retrieveVerificationState() {
    const state = this.secureRetrieve(this.keys.VERIFICATION_STATE)

    if (!state) return null

    // Check expiry
    if (Date.now() > state.expiry) {
      this.clearVerificationState()
      return null
    }

    return {
      ...state,
      code: this.simpleDecrypt(state.code)
    }
  }

  // Clear verification state
  clearVerificationState() {
    localStorage.removeItem(this.keys.VERIFICATION_STATE)
  }

  // Simple encryption/decryption for codes (not for sensitive data)
  simpleEncrypt(text) {
    return btoa(text.split('').reverse().join(''))
  }

  simpleDecrypt(encrypted) {
    try {
      return atob(encrypted).split('').reverse().join('')
    } catch (error) {
      return null
    }
  }

  // Log security events
  logSecurityEvent(event, details = {}) {
    try {
      const logs = this.secureRetrieve(this.keys.SECURITY_LOG) || []
      const newLog = {
        event,
        details,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        sessionId: this.generateSessionId()
      }

      logs.push(newLog)

      // Keep only last 50 logs
      if (logs.length > 50) {
        logs.shift()
      }

      this.secureStore(this.keys.SECURITY_LOG, logs)
    } catch (error) {
      console.error('Security logging failed:', error)
    }
  }

  // Generate session ID
  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Validate email format with additional security checks
  validateEmail(email) {
    if (!email || typeof email !== 'string') return false

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) return false

    // Additional security checks
    const suspiciousPatterns = [
      /[<>'"\\]/,  // HTML/script injection characters
      /\s{2,}/,    // Multiple spaces
      /\.{2,}/,    // Multiple dots
      /^[^\w]/,    // Starts with non-word character
    ]

    return !suspiciousPatterns.some(pattern => pattern.test(email))
  }

  // Comprehensive security check before allowing verification
  canProceedWithVerification(email) {
    if (!this.validateEmail(email)) {
      this.logSecurityEvent('invalid_email_attempt', { email })
      return { allowed: false, reason: 'Invalid email format' }
    }

    if (this.isSessionRateLimited()) {
      this.logSecurityEvent('session_rate_limited', { email })
      return { allowed: false, reason: 'Too many session attempts' }
    }

    return { allowed: true }
  }

  // Clean up expired data
  cleanup() {
    try {
      const now = Date.now()
      const keys = Object.keys(localStorage)

      keys.forEach(key => {
        if (key.startsWith('cv_')) {
          const data = this.secureRetrieve(key)
          if (data && data.timestamp && (now - data.timestamp) > this.config.SESSION_TIMEOUT) {
            localStorage.removeItem(key)
          }
        }
      })
    } catch (error) {
      console.error('Cleanup failed:', error)
    }
  }
}

// Export singleton instance
export const cvSecurity = new CVSecurityManager()

// Auto cleanup on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    cvSecurity.cleanup()
  })
}

export default cvSecurity