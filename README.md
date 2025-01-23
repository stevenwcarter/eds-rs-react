# React + TypeScript + Vite

[Demo Site](https://eds-rs-2025.javapl.us/)

[Blog Post](https://www.bounteous.com/insights/2024/09/04/introducing-our-search-utility-edge-delivery-services/)

Hello, and welcome to my AEM Rockstar submission for 2025!

My submission is a tool that I have developed which augments the spreadsheet capabilities
within Edge Delivery Services. The augmentations enable server-side searching, filtering,
sorting, and limiting the fields returned with the payload. These changes enable broader
capabilities without impacting site speed and overall performance.

To better demonstrate the capabilities of the tool, I've quickly stood up a prototype
hotel/room browsing experience that is based completely off data within a spreadsheet.
Please see the [Demo Site](https://eds-rs-2025.javapl.us/) linked here or above.
A small typeahead example is also included, which reads from a spreadsheet containing
10,000 fictitious records, and returns just the email address column for those which
match the search string entered (demonstrating search, sorting, and limiting fields).

Styling on the demo site is currently _very_ rough. I'll continue to develop the
experience over the next few weeks, but this experience is only meant to demonstrate
the capabilities of the service. The true submission for Rockstar is the service itself,
which will be open-sourced for anyone to deploy themselves in the next few weeks
(and is feature complete).

[queries.ts](src/queries.ts) - this file contains the GraphQL searches which utilize the service.
I didn't abstract these, to better demonstrate the ease-of-use of the tool. With further
abstraction, these queries could be performed even more simply directly within the code.
