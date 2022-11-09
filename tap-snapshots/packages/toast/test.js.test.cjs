/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`packages/toast/test.js TAP Close button does not show when canclose is not applied > must match snapshot 1`] = `
<link rel="stylesheet" type="text/css" href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css">
      <section class="relative overflow-hidden w-full" aria-label="Vellykket" style="height: auto; transition: height var(--f-expansion-duration, 0.3s); backface-visibility: hidden;">
        <div class=" toast flex group p-8 mt-16 rounded-8 border-2 w-full pointer-events-auto transition-all bg-green-50 border-green-200 text-green-800 ">
          <div class=" flex-shrink-0 rounded-full w-16 h-16 m-8 bg-green-300 "><svg role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-label="Vellykket">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.5 9l2 1.5L11 6"></path>
</svg></div>
          <div role="status" class="self-center mr-8 py-4 last-child:mb-0">
            <p>This is my toast</p>
          </div>
          
        </div>
      </section>
`

exports[`packages/toast/test.js TAP Close button shows when canclose=true > must match snapshot 1`] = `
<link rel="stylesheet" type="text/css" href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css">
      <section class="relative overflow-hidden w-full" aria-label="Vellykket" style="height: auto; transition: height var(--f-expansion-duration, 0.3s); backface-visibility: hidden;">
        <div class=" toast flex group p-8 mt-16 rounded-8 border-2 w-full pointer-events-auto transition-all bg-green-50 border-green-200 text-green-800 ">
          <div class=" flex-shrink-0 rounded-full w-16 h-16 m-8 bg-green-300 "><svg role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-label="Vellykket">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.5 9l2 1.5L11 6"></path>
</svg></div>
          <div role="status" class="self-center mr-8 py-4 last-child:mb-0">
            <p>This is my toast</p>
          </div>
          <button class="ml-auto p-8">
  <svg role="img" aria-label="Lukk" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path fill="currentColor" fill-rule="evenodd" d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z" cliprule="evenodd"></path>
  </svg>
</button>
        </div>
      </section>
`

exports[`packages/toast/test.js TAP Initialization adds toast container to the dom > must match snapshot 1`] = `

      <link rel="stylesheet" type="text/css" href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css">
      <aside class="fixed fixed-ios-fix bottom-16 left-0 right-0 mx-8 sm:mx-16 z-50 pointer-events-none">
        <div id="f-toast-container-list" class="f-toaster grid f-grid auto-rows-auto justify-items-center justify-center mx-auto pointer-events-none">
          
        </div>
      </aside>
`

exports[`packages/toast/test.js TAP Initially no toasts are present > must match snapshot 1`] = `

      <link rel="stylesheet" type="text/css" href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css">
      <aside class="fixed fixed-ios-fix bottom-16 left-0 right-0 mx-8 sm:mx-16 z-50 pointer-events-none">
        <div id="f-toast-container-list" class="f-toaster grid f-grid auto-rows-auto justify-items-center justify-center mx-auto pointer-events-none">
          
        </div>
      </aside>
`

exports[`packages/toast/test.js TAP Nothing shows when text not provided > must match snapshot 1`] = `

`

exports[`packages/toast/test.js TAP set method: toast element created from given data > must match snapshot 1`] = `

      <link rel="stylesheet" type="text/css" href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css">
      <aside class="fixed fixed-ios-fix bottom-16 left-0 right-0 mx-8 sm:mx-16 z-50 pointer-events-none">
        <div id="f-toast-container-list" class="f-toaster grid f-grid auto-rows-auto justify-items-center justify-center mx-auto pointer-events-none">
           <f-toast class="w-full" id="abc" type="" text="This is a toast">
            </f-toast>
        </div>
      </aside>
`

exports[`packages/toast/test.js TAP set/del methods: set a toast then delete it > must match snapshot 1`] = `

      <link rel="stylesheet" type="text/css" href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css">
      <aside class="fixed fixed-ios-fix bottom-16 left-0 right-0 mx-8 sm:mx-16 z-50 pointer-events-none">
        <div id="f-toast-container-list" class="f-toaster grid f-grid auto-rows-auto justify-items-center justify-center mx-auto pointer-events-none">
          
        </div>
      </aside>
`
