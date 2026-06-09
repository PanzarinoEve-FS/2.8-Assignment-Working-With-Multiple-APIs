# Using Data From Multiple Sources

**Objective:** 
- Create an `HTML` interface
- upon loading receives information from two `API` sources
- one which is `dependent` on the other 
- The interface should also be updated via the `click` of an element within the interface.

**Key topics:**

- Using `fetch()` to connect to two chained API sources
Utilizing an API source that requires a key for authentication
- Using `.gitignore` to keep sensitive information off of the GitHub repo
- DOM `Querying` with complex `selectors`
- Button Click `Events`
- `Creating HTML Elements` through `JavaScript`
**Overview:**

You will code an application that utilizes two API responses chained together through Promises to create an interface via the information gained in the response.

Do NOT use any `async / await` to do this assignment<br>
You can only use the `Fetch` API. **Doing so may result in a zero.**

**Provided APIs:**

Please use any API from this list that does not require authentication. These are represented by a No in the presented chart's Auth column: https://github.com/public-apis/public-apis. 

**Saving Data with localStorage**

We will also introduce `localStorage`, a browser feature that allows applications to save small pieces of information even after the page refreshes.

This can be useful for things like:

- Saving user preferences
- Remembering settings
- Storing lightweight application data
For example:
- localStorage.setItem("theme", "dark");

const savedTheme = localStorage.getItem("theme");
console.log(savedTheme);
In this example, a user's theme preference is saved and can later be retrieved, even after the browser is closed and reopened.
**Assignment specifications:**

**1. Create your own HTML**
**Minimum Requirements:**
-Your HTML should be semantic 
- header 
- two sections for content 
- a footer
- any necessary tags for your dynamic content such as p, span, and headers.

**2. Create your own CSS**

Style your project to have an easy to use layout and a visual aesthetic you find fitting for the topic at hand. <br>
Don't forget to link a stylesheet to your HTML!

**3. Create your own JavaScript**

Using one of the provided API combinations or an instructor approved combination, obtain data from the APIs that can be used to create an interactive page. The expectations for your JavaScript are:

- `fetch` includes both `then` and `catch` methods
- Error handling for rejected `promises`
- The use of two `APIs` is required, at least one of which utilizes a form of `authentication`
- The use of `Modules` to organize code.
- When the page first loads, the APIs are accessed and the information is displayed only if both APIs respond successfully. 
- A reusable function for the APIs to be accessed through different events
- An Empty state is presented until the intended data is ready
- `localStorage` is used to limit API requests
- Relevant HTML elements are created via JavaScript
- All necessary JavaScript to run within an `IFFE` is organized as such.
- Do NOT use any `async / await` to do this assignment
- You can only use the `Fetch API` -> Doing so may result in a zero.
**Getting Started:**

Remember to use Live Server for VS Code or an equivalent in another IDE to run a local server for these files.
Deliverables

Upon completion of the assignment, please link to your GitHub repo along with uploading a `.zip` of the most recent work pushed to the GitHub repo. <br>
Any commits to your repo after the assignment due date will be ignored unless otherwise discussed with your isntructor.<br>

Links may be in the form of a comment on the FSO assignment or in a standalone text file within the .zip file.
