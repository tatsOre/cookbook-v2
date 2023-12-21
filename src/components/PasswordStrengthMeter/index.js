import React from "react"
import zxcvbn from "zxcvbn"
import { IconCheck } from "../Icon"
import styles from './PasswordStrengthMeter.module.scss'

function PasswordStrengthMeter({ password, description }) {
  const strength = zxcvbn(password).score

  const createPasswordLabel = (value) => {
    switch (value) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return null;
    }
  }

  return (
    <div className={styles.password__strength__meter}>
      <div className={styles['strength-meter']}>
        <div
          className={styles['strength-meter-fill']}
          data-strength={strength}
        >
        </div>
      </div>
      <p>
        {password ? 'Password strength: ' : 'Set a password'}
        <b>{password ? createPasswordLabel(strength) : ''}</b>
      </p>
      <div className={styles.pill} data-valid={password.length > 7}>
        <IconCheck size={14} strokeWidth={4} />{' '}
        <span> {description}</span>
      </div>
    </div>
  )
}

export default PasswordStrengthMeter
