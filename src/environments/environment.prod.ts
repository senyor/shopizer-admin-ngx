/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  googleApiKey: '',
  //apiUrl: 'http://aws-demo.shopizer.com:8080/api',
  apiUrl: 'http://localhost:8080/api',
  client: {
    language: {
      default: 'en',
      array: [
        'en',
        'fr',
        'ru'
      ],
    },
  }
};
