import { useState, useEffect, useRef } from 'react'
import { useForm } from '@formspree/react'
import cvSecurity from '../utils/cvSecurity'

// ──────────────────────────────────────────────────────────────
// Formspree form ID
// ──────────────────────────────────────────────────────────────
const FORMSPREE_FORM_ID = 'xnjbpovv'
const OWNER_EMAIL = 'nadunanjana31@gmail.com'

const CVVerificationModal = ({ isOpen, onClose, onVerified }) => {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', ''])
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [codeExpiry, setCodeExpiry] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const codeRefs = useRef([])

  const [formspreeState, sendToFormspree] = useForm(FORMSPREE_FORM_ID)

  useEffect(() => {
    if (isOpen) {
      cvSecurity.logSecurityEvent('modal_opened')
    }
  }, [isOpen])

  // Countdown timer
  useEffect(() => {
    let interval
    if (codeExpiry && step === 'code') {
      interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((codeExpiry - Date.now()) / 1000))
        setTimeRemaining(remaining)
        if (remaining === 0) {
          clearVerificationData()
          setError('Code expired. Request a new one.')
          setStep('email')
        }
      }, 1000)
    }
    return () => { if (interval) clearInterval(interval) }
  }, [codeExpiry, step])

  const clearVerificationData = () => {
    setGeneratedCode('')
    setCodeExpiry(null)
    setCodeDigits(['', '', '', '', '', ''])
    setTimeRemaining(0)
    cvSecurity.clearVerificationState()
  }

  const handleCodeDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newDigits = [...codeDigits]
    newDigits[index] = value.slice(-1)
    setCodeDigits(newDigits)

    // Auto-focus next box
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus()
    }
  }

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      codeRefs.current[index - 1]?.focus()
    }
  }

  const handleCodePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) {
      const newDigits = [...codeDigits]
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || ''
      }
      setCodeDigits(newDigits)
      const focusIndex = Math.min(pasted.length, 5)
      codeRefs.current[focusIndex]?.focus()
    }
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const securityCheck = cvSecurity.canProceedWithVerification(email)
    if (!securityCheck.allowed) {
      setError(securityCheck.reason)
      return
    }

    setIsLoading(true)

    try {
      const code = await cvSecurity.generateSecureCode()

      // Send via Formspree — send ONLY the verification code in the email body
      // (owner notification fields kept minimal). The 'message' body will contain
      // the 6-digit code only to satisfy the requirement.
      await sendToFormspree({
        email: OWNER_EMAIL,
        _replyto: email,
        subject: `Your CV verification code`,
        verification_code: code,
        // message MUST contain only the code (plain text)
        message: `${code}`,
      })

      const expiry = Date.now() + cvSecurity.config.VERIFICATION_CODE_EXPIRY
      setGeneratedCode(code)
      setCodeExpiry(expiry)
      cvSecurity.storeVerificationState(email, code, expiry)
      cvSecurity.updateSessionAttempts()
      setStep('code')
    } catch (err) {
      console.error('Verification error:', err)
      setError('An error occurred. Please try again.')
    }

    setIsLoading(false)
  }

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    setError('')

    const storedState = cvSecurity.retrieveVerificationState()
    if (!storedState) {
      setError('Session expired. Request a new code.')
      setStep('email')
      return
    }

    const enteredCode = codeDigits.join('')
    if (enteredCode.length !== 6 || !/^\d{6}$/.test(enteredCode)) {
      setError('Enter a valid 6-digit code.')
      return
    }

    if (enteredCode === storedState.code) {
      cvSecurity.clearVerificationState()
      cvSecurity.logSecurityEvent('verification_success', { email })
      onVerified()
      onClose()
      setStep('email')
      setEmail('')
      setCodeDigits(['', '', '', '', '', ''])
      clearVerificationData()
      setError('')
    } else {
      setError('Incorrect code. Try again.')
    }
  }

  const handleClose = () => {
    clearVerificationData()
    setStep('email')
    setEmail('')
    setCodeDigits(['', '', '', '', '', ''])
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="cv-modal-overlay" onClick={handleClose}>
      <div className="cv-modal" onClick={(e) => e.stopPropagation()}>

        <div className="cv-modal-header">
          <h3>Email Verification</h3>
        </div>

        <div className="cv-modal-body">
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit}>
              <p className="cv-modal-desc">
                Enter your email to receive a verification code for CV download.
              </p>
              <div className="cv-security-notice">
                <small>Your email is used only for verification.</small>
              </div>
              <div className="cv-form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="cv-input"
                  required
                  disabled={isLoading}
                />
              </div>
              {error && <div className="cv-error">{error}</div>}
              <div className="cv-modal-actions">
                <button type="button" className="btn cv-btn-cancel" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn cv-btn-primary" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Code'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit}>
              <p className="cv-modal-desc">
                Enter the 6-digit code sent to <strong>{email}</strong>
              </p>
              <div className="cv-security-notice">
                <small>Code expires in {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</small>
              </div>
              <div className="cv-code-boxes" onPaste={handleCodePaste}>
                {codeDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (codeRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    className="cv-code-box"
                    autoFocus={i === 0}
                  />
                ))}
              </div>
              {error && <div className="cv-error">{error}</div>}
              <div className="cv-resend-notice">
                <small>Didn't get it? Check spam or request again.</small>
              </div>
              <div className="cv-modal-actions">
                <button type="button" className="btn cv-btn-cancel" onClick={() => { clearVerificationData(); setStep('email'); setError('') }}>
                  Back
                </button>
                <button type="submit" className="btn cv-btn-primary">
                  Verify & Download
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

export default CVVerificationModal