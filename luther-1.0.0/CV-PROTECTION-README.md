# CV Download Protection System

## Overview
This portfolio includes a comprehensive email verification system for CV downloads, providing multiple layers of security and protection against abuse.

## Security Features

### 🔐 **Multi-Layer Protection**
- **Email Verification**: 6-digit codes sent via Formspree (free email service)
- **Rate Limiting**: Prevents brute force attacks
- **Code Expiration**: 3-minute expiry for security
- **Session Management**: Secure state storage
- **Input Validation**: Comprehensive email and code validation
- **Security Logging**: Tracks all security events

### 🛡️ **Rate Limiting**
- **Per Email**: Maximum 3 attempts per email address
- **Per Session**: Maximum 5 attempts per browser session
- **Time Window**: 1-hour cooldown after limits exceeded
- **Automatic Reset**: Limits reset after cooldown period

### 🔒 **Data Security**
- **Secure Storage**: Encrypted localStorage with integrity checks
- **Data Hashing**: Email addresses are hashed for privacy
- **Auto Cleanup**: Expired data automatically removed
- **No Server Storage**: All verification happens client-side

## Setup Instructions

### 1. Formspree Configuration
Follow the detailed setup guide in `formspree-setup.html` or:

1. Create Formspree account at [formspree.io](https://formspree.io)
2. Create a new form for "CV Verification"
3. Copy your form endpoint URL
4. Configure email notifications

### 2. Update Form Endpoint
In `src/components/CVVerificationModal.jsx`, replace:
```javascript
const formspreeEndpoint = 'https://formspree.io/f/your_form_id' // ← Your Formspree Form ID
```

**Important**: The verification code is only sent via email. There are no alerts or popups showing the code - users must check their email to receive the verification code.

### 3. Security Configuration
The security settings can be adjusted in `src/utils/cvSecurity.js`:

```javascript
const SECURITY_CONFIG = {
  VERIFICATION_CODE_EXPIRY: 3 * 60 * 1000, // 3 minutes
  MAX_ATTEMPTS_PER_SESSION: 8,               // Max attempts per session
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000,      // 24 hour session timeout
}
```

## How It Works

### User Flow
1. **Click "Download CV"** → Modal opens with email form
2. **Enter Email** → System validates and sends 6-digit code
3. **Enter Code** → System verifies and allows download
4. **Download** → CV file downloads automatically

### Security Checks
- ✅ Email format validation
- ✅ Rate limiting per session
- ✅ Code expiration (3 minutes)
- ✅ Secure code generation (crypto API)
- ✅ Input sanitization
- ✅ Session integrity checks

### Error Handling
- **Invalid Email**: Clear error message
- **Rate Limited**: User-friendly cooldown message
- **Expired Code**: Automatic redirect to email step
- **Network Error**: Retry option with fallback
- **Invalid Code**: Attempt tracking with limits

## Security Events Logged

The system logs security events for monitoring:
- `modal_opened`: When verification modal opens
- `code_sent`: When verification email is sent
- `verification_success`: When code is verified successfully
- `verification_failed`: When wrong code is entered
- `code_expired`: When verification code expires
- `email_send_failed`: When email sending fails
- `invalid_email_attempt`: When invalid email format used
- `session_rate_limited`: When session limit exceeded
- `email_rate_limited`: When email limit exceeded

## Testing

### Development Mode
- Codes are shown in alert popup for testing
- Remove alert in production after EmailJS setup
- Check browser console for security logs

### Production Mode
- Configure EmailJS credentials
- Remove test alerts
- Monitor security logs for suspicious activity

## File Structure

```
src/
├── components/
│   ├── CVVerificationModal.jsx    # Main verification component
│   └── About.jsx                  # Updated to use verification
├── utils/
│   └── cvSecurity.js             # Security utilities and management
└── styles/
    └── styles.css                # Modal and security styling
```

## API Reference

### CVSecurity Class

#### Methods
- `canProceedWithVerification(email)`: Comprehensive security check
- `generateSecureCode()`: Cryptographically secure code generation
- `storeVerificationState(email, code, expiry)`: Secure state storage
- `retrieveVerificationState()`: Secure state retrieval
- `clearVerificationState()`: Clean up verification data
- `logSecurityEvent(event, details)`: Security event logging

#### Configuration
All security settings are configurable in the `SECURITY_CONFIG` object.

## Troubleshooting

### Common Issues

1. **Email not received**
   - Check spam/junk folder
   - Verify EmailJS credentials
   - Check email template formatting

2. **Rate limiting triggered**
   - Wait for cooldown period
   - Try different email if needed
   - Clear browser data to reset session

3. **Code expired**
   - Request new code automatically
   - Check system time settings

4. **Security errors**
   - Check browser console for details
   - Verify EmailJS configuration
   - Ensure HTTPS in production

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('cv_debug', 'true')
```

## Production Deployment

### Security Checklist
- [ ] EmailJS credentials configured
- [ ] HTTPS enabled
- [ ] Test email delivery
- [ ] Verify rate limiting
- [ ] Check mobile responsiveness
- [ ] Remove debug alerts
- [ ] Monitor security logs

### Performance Optimization
- Lazy load security utilities
- Minimize bundle size
- Optimize email templates
- Cache security configurations

## Support

For issues or questions:
1. Check browser console for errors
2. Review security logs in localStorage
3. Verify EmailJS dashboard
4. Test with different email providers

## License

This security system is part of the portfolio protection mechanism and should not be used for unauthorized access prevention.