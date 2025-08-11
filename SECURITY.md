# 🔒 **Security Policy for ThePegeArts Design System**

## **Project Information**
- **Project**: ThePegeArts Moonlit Portfolio Design System
- **Maintainer**: Thanattsitt Santisamranwilai
- **Contact**: thanattsitt.info@yahoo.co.uk
- **Repository**: https://github.com/Pigletpeakkung/thepegearts

---

## **Supported Versions**

We actively maintain and provide security updates for the following versions of the ThePegeArts design system:

| Version | Supported          | Status | End of Life |
| ------- | ------------------ | ------ | ----------- |
| 2.1.x   | ✅ **Supported**   | Active | TBD         |
| 2.0.x   | ✅ **Supported**   | LTS    | 2025-01-01  |
| 1.9.x   | ⚠️ **Limited**     | EOL    | 2024-06-01  |
| 1.8.x   | ❌ **Unsupported** | EOL    | 2024-03-01  |
| < 1.8   | ❌ **Unsupported** | EOL    | 2024-01-01  |

### **Support Policy**
- **Active**: Full support including security patches, bug fixes, and feature updates
- **LTS (Long Term Support)**: Security patches and critical bug fixes only
- **Limited**: Security patches for critical vulnerabilities only
- **Unsupported**: No security updates or patches

---

## **Reporting a Vulnerability**

### **How to Report**

If you discover a security vulnerability in ThePegeArts, please report it responsibly:

#### **Primary Contact**
📧 **Email**: thanattsitt.info@yahoo.co.uk
- Subject: `[SECURITY] ThePegeArts Vulnerability Report`
- Please include "SECURITY" in the subject line for priority handling

#### **Alternative Reporting Methods**
- 🔒 **GitHub Security Advisories**: [Create a private security advisory](https://github.com/Pigletpeakkung/thepegearts/security/advisories/new)
- 💬 **Direct Message**: Contact @Pigletpeakkung on GitHub

### **What to Include in Your Report**

Please provide as much information as possible to help us understand and reproduce the issue:

```markdown
## Vulnerability Report Template

### Summary
Brief description of the vulnerability

### Impact
What could an attacker achieve?

### Steps to Reproduce
1. Step one
2. Step two
3. Step three

### Technical Details
- **Component**: Which part of the system is affected
- **Version**: ThePegeArts version number
- **Browser**: Browser and version (if applicable)
- **Environment**: Development/Production/Other

### Proof of Concept
Include code snippets, screenshots, or videos if applicable

### Suggested Fix
If you have ideas for how to fix the issue

### Reporter Information
- **Name**: Your name (optional)
- **Contact**: Your preferred contact method
- **Credit**: How you'd like to be credited (if at all)
```

### **Response Timeline**

We are committed to responding to security reports promptly:

| Timeline | Action |
| -------- | ------ |
| **24 hours** | Initial acknowledgment of report |
| **72 hours** | Initial assessment and triage |
| **7 days** | Detailed response with timeline |
| **30 days** | Target resolution for critical issues |
| **90 days** | Target resolution for non-critical issues |

---

## **Security Best Practices**

### **For Users of ThePegeArts**

#### **Content Security Policy (CSP)**
When using ThePegeArts components, implement a strong CSP:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
               font-src 'self' fonts.gstatic.com; 
               script-src 'self'; 
               img-src 'self' data: https:;">
```

#### **Input Sanitization**
Always sanitize user input when using form components:

```javascript
// Example: Sanitize user input
function sanitizeInput(input) {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Use with ThePegeArts form components
document.querySelector('.form-control').addEventListener('input', (e) => {
    e.target.value = sanitizeInput(e.target.value);
});
```

#### **Secure Theme Storage**
When using theme persistence, validate stored values:

```javascript
// Secure theme validation
function validateTheme(theme) {
    const allowedThemes = ['light', 'dark', 'auto'];
    return allowedThemes.includes(theme) ? theme : 'auto';
}

// Safe theme retrieval
function getStoredTheme() {
    try {
        const stored = localStorage.getItem('thepegearts-theme');
        return validateTheme(stored) || 'auto';
    } catch (error) {
        console.warn('Failed to retrieve theme:', error);
        return 'auto';
    }
}
```

### **For Contributors**

#### **Code Review Requirements**
- All security-related changes require review from maintainer
- Use static analysis tools (ESLint, Stylelint)
- Test for XSS vulnerabilities in dynamic content
- Validate all user inputs and outputs

#### **Dependency Management**
```bash
# Check for known vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# Update dependencies regularly
npm update
```

---

## **Known Security Considerations**

### **JavaScript Components**

#### **DOM Manipulation**
ThePegeArts JavaScript components safely manipulate the DOM:

```javascript
// Safe DOM insertion (used internally)
function safeInsertHTML(element, html) {
    // Create temporary container
    const temp = document.createElement('div');
    temp.textContent = html; // This escapes HTML
    element.appendChild(temp.firstChild);
}

// Avoid direct innerHTML usage
// element.innerHTML = userInput; // ❌ Dangerous
element.textContent = userInput;   // ✅ Safe
```

#### **Event Handling**
Components use proper event delegation and cleanup:

```javascript
// Proper event cleanup in components
class SafeComponent {
    constructor(element) {
        this.element = element;
        this.boundHandleClick = this.handleClick.bind(this);
        this.init();
    }
    
    init() {
        this.element.addEventListener('click', this.boundHandleClick);
    }
    
    destroy() {
        this.element.removeEventListener('click', this.boundHandleClick);
    }
    
    handleClick(event) {
        // Prevent default when needed
        event.preventDefault();
        // Validate event target
        if (!this.element.contains(event.target)) return;
        // Safe handling logic
    }
}
```

### **CSS Security**

#### **CSS Injection Prevention**
CSS custom properties are validated:

```css
/* Safe CSS custom property usage */
:root {
    /* Only allow specific color formats */
    --user-color: var(--fallback-color, #7C3AED);
}

/* Avoid user-controlled CSS values */
.dynamic-style {
    /* ❌ Dangerous if user-controlled */
    /* background: var(--user-background); */
    
    /* ✅ Safe with validation */
    background: var(--validated-background, var(--default-background));
}
```

#### **External Resource Loading**
```css
/* Safe font loading */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Avoid user-controlled URLs */
/* @import url(var(--user-font-url)); ❌ */
```

---

## **Vulnerability Disclosure Policy**

### **Responsible Disclosure**

We follow responsible disclosure practices:

1. **Private Reporting**: Report vulnerabilities privately first
2. **Coordination**: Work with us to understand and fix the issue
3. **Timeline**: Allow reasonable time for fixes before public disclosure
4. **Credit**: Receive appropriate credit for your discovery

### **Public Disclosure Timeline**

- **Immediate**: Critical vulnerabilities affecting user security
- **7 days**: High-severity vulnerabilities with available patches
- **30 days**: Medium-severity vulnerabilities
- **90 days**: Low-severity vulnerabilities or when patches are available

### **Hall of Fame**

We recognize security researchers who help improve ThePegeArts security:

#### **2024 Contributors**
- *No security issues reported yet - help us keep it secure!*

#### **Recognition Criteria**
- Valid security vulnerability reports
- Responsible disclosure practices  
- Constructive communication
- Permission to be listed (optional)

---

## **Security Updates and Notifications**

### **How to Stay Informed**

#### **GitHub Notifications**
- 👀 **Watch** the repository for security updates
- 🔔 **Enable notifications** for security advisories
- ⭐ **Star** the repo to show support

#### **Security Advisories**
Monitor our [GitHub Security Advisories](https://github.com/Pigletpeakkung/thepegearts/security/advisories) for:
- CVE assignments
- Severity ratings
- Affected versions
- Mitigation steps
- Patch information

#### **Release Notes**
Check [Releases](https://github.com/Pigletpeakkung/thepegearts/releases) for security-related updates marked with:
- 🔒 **Security**: Security patches and fixes
- ⚠️ **Breaking**: Changes that might affect security implementations

### **Emergency Notifications**
For critical security issues, we will:
- Email direct contacts when possible
- Post urgent updates on GitHub
- Update documentation immediately
- Provide clear migration paths

---

## **Security-First Development**

### **Our Commitment**

ThePegeArts is built with security as a core principle:

#### **Secure by Design**
- Minimal attack surface
- Input validation at all levels
- Output encoding for dynamic content
- Proper error handling
- No sensitive data in client-side code

#### **Privacy Protection**
- No tracking or analytics by default
- Minimal data collection
- Transparent about any external dependencies
- User control over data storage (themes, preferences)

#### **Regular Security Reviews**
- Code reviews for all changes
- Dependency vulnerability scanning
- Static analysis tools
- Manual security testing

### **Security Testing**

#### **Automated Testing**
```bash
# Security-focused test commands
npm run test:security    # Security-specific tests
npm run audit           # Dependency vulnerability check
npm run lint:security   # Security-focused linting
```

#### **Manual Testing Checklist**
- [ ] XSS prevention in dynamic content
- [ ] CSRF protection where applicable
- [ ] Input validation and sanitization
- [ ] Output encoding
- [ ] Error message information disclosure
- [ ] Authentication and authorization (if applicable)

---

## **Incident Response Plan**

### **Severity Classification**

#### **Critical (CVSS 9.0-10.0)**
- Immediate remote code execution
- Complete system compromise
- Mass data exposure

**Response**: Immediate patch within 24-48 hours

#### **High (CVSS 7.0-8.9)**
- Limited remote code execution
- Significant data exposure
- Authentication bypass

**Response**: Patch within 7 days

#### **Medium (CVSS 4.0-6.9)**
- Limited information disclosure
- Denial of service
- Privilege escalation

**Response**: Patch within 30 days

#### **Low (CVSS 0.1-3.9)**
- Minor information leakage
- Limited impact vulnerabilities

**Response**: Patch in next regular release

### **Response Process**

1. **Assessment** (24-48 hours)
   - Confirm and reproduce the vulnerability
   - Assess impact and severity
   - Determine affected versions

2. **Development** (varies by severity)
   - Create fix in private branch
   - Test thoroughly
   - Prepare security advisory

3. **Release** (coordinated)
   - Release patched versions
   - Publish security advisory
   - Notify users and maintainers

4. **Follow-up** (ongoing)
   - Monitor for exploitation
   - Gather feedback
   - Improve security processes

---

## **Contact Information**

### **Primary Security Contact**
**Thanattsitt Santisamranwilai**
- 📧 **Email**: thanattsitt.info@yahoo.co.uk
- 🐙 **GitHub**: [@Pigletpeakkung](https://github.com/Pigletpeakkung)
- ⏰ **Response Time**: Within 24-48 hours

### **Backup Contacts**
- 🔒 **GitHub Security**: Use GitHub's security advisory system
- 💬 **Community**: Post in GitHub Discussions (for non-sensitive issues)

### **Languages**
- **English**: Preferred
- **Thai**: Native language support available

---

## **Legal and Compliance**

### **Safe Harbor**

We support security research conducted in good faith and provide safe harbor for:
- Testing on your own systems or with explicit permission
- Responsible disclosure of vulnerabilities
- Research that helps improve security

### **Out of Scope**

The following are considered out of scope:
- Social engineering attacks
- Physical attacks
- Denial of service attacks
- Spam or social engineering via project communication channels

### **Coordinated Vulnerability Disclosure**

We participate in coordinated vulnerability disclosure and work with:
- Security researchers
- Other project maintainers
- Security organizations
- CVE coordination bodies

---

## **Additional Resources**

### **Security Guidelines**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Best Practices](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### **Tools for Security Testing**
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing proxy
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Dependency vulnerability scanner
- [ESLint Security Plugin](https://github.com/eslint-community/eslint-plugin-security) - Static analysis

### **Reporting Templates**
- [Security Issue Template](.github/ISSUE_TEMPLATE/security.md)
- [Vulnerability Disclosure Template](.github/SECURITY_DISCLOSURE_TEMPLATE.md)

---

## **Changelog**

### **Version 1.2 - January 2024**
- Enhanced vulnerability reporting process
- Added severity classification system
- Improved response timelines
- Added security testing guidelines

### **Version 1.1 - December 2023**
- Added responsible disclosure policy
- Enhanced contact information
- Added security best practices section

### **Version 1.0 - November 2023**
- Initial security policy
- Basic vulnerability reporting process
- Contact information established

---

**Last Updated**: January 15, 2024  
**Next Review**: April 15, 2024  
**Policy Version**: 1.2

---

*This security policy is part of the ThePegeArts project commitment to maintaining a secure and trustworthy design system for all users.*

**Built with 🔒 by [ThePegeArts](https://github.com/Pigletpeakkung/thepegearts)**
