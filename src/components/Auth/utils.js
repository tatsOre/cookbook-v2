export default {
    EMAIL: {
        NAME: 'email',
        LABEL: 'Email Address',
        PLACEHOLDER: 'bearberzatto@yeschef.com',
        RULES: {
            REQUIRED: 'Please provide an email address',
            VALIDATION: {
                PATTERN: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                MESSAGE: 'Email address must be a valid address'
            },
            MAX_LENGTH: {
                VALUE: 50,
                MESSAGE: 'Email address should have at most 50 characters'
            }
        },
        DEFAULT_VALUE: ''
    },
    PASSWORD: {
        NAME: 'password',
        LABEL: {
            LOGIN: 'Password',
            SIGNUP: 'Create a password'
        },
        RULES: {
            REQUIRED: 'Please provide a password',
            MIN_LENGTH: {
                VALUE: 8,
                MESSAGE: 'Must include at least 8 characters'
            }
        },
        DEFAULT_VALUE: ''
    },
    HEADING: {
        DEFAULT: 'Enter your email address to log in or create an account.',
        LOGIN: 'Log in to Cookbook',
        SIGNUP: 'Join Cookbook'
    }
}
