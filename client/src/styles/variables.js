import { css } from 'styled-components/macro';

const variables = css`
  :root {
    --light-mode-primary-color: #ffffff;
    --light-mode-body-color: #f5f6fb;
    --dark-mode-primary-color: #1b1d2a;
    --dark-mode-body-color: #0c0f1d;
    --dark-mode-default-font-color:#cecfd1;
    --light-mode-default-font-color: #2f3f56;
    --minor-font-color: #5c5f6b;
    --icon-font-color: #76777f;
    --light-mode-default-theme-color: #191970 ;
    --dark-mode-default-theme-color: #3D59AB ;
    --light-mode-default-input-color: #f1f4f9 ;
    --dark-mode-default-input-color: #343746 ;
    --default-error-color: #ff6273;
    --default-notif-color: red;
    --black: #121212;
    --near-black: #181818;
    --dark-grey: #282828;
    --grey: #535353;
    --light-grey: #b3b3b3;

    --default-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.8);

    --font: 'Lato', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 24px;

    --spacing-xxs: 4px;
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 64px;

    --border-radius-circle: 50%;

    --site-max-width: 1300px;
  }
`;

export default variables;
