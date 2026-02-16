# HW2: Personality quiz; From Stanford CS193X

You are required to complete two parts of the assignment:

- **Personality Quiz**: This is a web page with a Buzzfeed-style personality test. Modify `index.html`, `style.css`, and `script.js` as necessary to complete the web page. 
  - `constants.js` and `provided-style.css` are provided. You should not need to modify these files; please keep all your JS and CSS in `script.js` and `style.css` respectively. 
-
---

---


In this homework, you will be practicing the HTML, CSS, and JavaScript.

For **Part 1**, you will be implementing a [Buzzfeed](https://www.buzzfeed.com/)-style personality quiz. A lot of the HTML and CSS is already implemented for you, but you will still need to make some HTML and CSS modifications to complete the assignment. None of the JavaScript has been implemented for you, other than `constants.js` that constants the quiz result information.



---


<section class="part" markdown="1">
## Part 0: Getting started





</section>


<section class="part" markdown="1">
## Part 1: Personality quiz `index.html`

For Part 1, you will create a personality quiz called "Adopt A Dog And We'll Reveal A Deep Truth About You."

We have completed a lot of the HTML and CSS for you already. We expect you will have to make modifications to the following files to complete the assignment:
- `index.html`: Most of the HTML is written for you, but you will likely need to make some modifications for the mobile layout and the JavaScript.
- `style.css`: A lot of the CSS is already written for you in `provided-style.css`, but you will need to make some modifications for all parts of the assignment. Please make your CSS changes in `style.css` and not `provided-style.css`, so that the TAs have an easier time grading.
- `script.js`: Write your JavaScript here.

### Overall appearance and behavior

The following video shows the look and behavior of the quiz we are asking you to implement.

<!-- <iframe src="./victoria-kirst-hm2-quiz.mp4" width="640" height="360"></iframe> -->
<video width="320" height="240" controls>
  <source src="victoria-kirst-hm2-quiz.mp4" type="video/mp4">
</video>

One detail that is hard to see in the video:
- After the quiz is completed (i.e. after all three questions have been answered), it should *not* be possible to change your answer anymore.


### 1. Choice grid

Much of the CSS has already been completed for you, but you need to finish styling the answer choice grids.

**Choice grid**
<img src="images/hw2-dog-grid.png" class="screenshot" />
- You should use a **multi-row flexbox** to achieve this layout.
  - We didn't talk about multi-row flexbox layout in class, but you can allow flex items to wrap onto the next line (i.e. the second row) by setting `flex-wrap: wrap;` onto the flex container.
- There is `20px` of space between each row
- Each flex item has a width of `32.5%`, and each item is spread out with as much space between the other as there can be in the flex container.

**Choice: unanswered**
<img src="images/hw2-dog-unanswered.png" class="screenshot" />
- Container
  - Background color is `#f4f4f4`
  - Border is `1px` thick and color is `#dcdcdc`
  - Width of the element **including** the border is `32.5%`
    - **Hint:** The `box-sizing` CSS property might be helpful. See April 12 slides.
  - Space between the border and the content of the element is `10px`.
- Choice image (i.e. dog, house, or toy image)
  - **Hints:** We did not tell you the width or height of the image intentionally, as we want you figure out how to get it to behave like this. There are many ways to get the images to "shrink" inside its container
    - The [tic-tac-toe example]({{relative}}lectures/09/tictactoe.html) has almost the same layout, and fits the X and O images into the invisible `<div>` containers. Take a look at the CSS for this example.
    - The beverage image of HW1 also had similar behavior. Recall what dimensions we gave you for the beverage image.
    - You are allowed to modify the HTML if you'd like (but you don't necessarily have to if you choose a different approach)
    - You might also find [`:first-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child) pseudo-selector helpful (but you don't necessarily have to if you choose a different approach)
- Checkbox
  - The unchecked image is `images/unchecked.png`
  - The height and width is of the image is `20px`
  - **Note:** Do not use an `<input type="checkbox" />` for this. Just display the image.

### 2. Mobile layout

You need to also modify the CSS and HTML if necessary to implement support a mobile view. The video below shows an example of how it should look and behave:

<iframe src="https://drive.google.com/file/d/0BxtKIz3gISunbDNhclNnMmNJVkU/preview" width="640" height="360"></iframe>

Please see April 14 Slides for details on how to implement and test your homework layout in mobile view on your desktop Chrome.

**Note:** You should **not** have to load your web page on your phone in order to test this layout. Emulate mobile in [Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode/), [FireFox](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode), or [Safari](http://www.kirkville.com/use-safaris-responsive-design-mode-in-el-capitan/).

- If the page is viewed on mobile:
  - The viewport should be set to zoom-level 100%, and the width should be the device width
- If the device screen size is less than `700px` wide:
  - The width of the page content should be `95%` instead of `700px`
  - The yellow circles in the page header should not appear
- If the device screen size is less than `500px` wide:
  - Each answer choice should be `49%` in width instead of `32.5%`


### 3. Quiz behavior

This web page is a 3-question personality quiz. Write the code necessary to implement the quiz behavior as detailed below.

Even though you will mostly be writing JavaScript for this part, you may need to also update the HTML or CSS in order to implement the behavior as described.

**Hint:** Aspects of the quiz are quite similar in behavior to the [tic-tac-toe.html example]({{relative}}lectures/09/tictactoe.html) discussed in lecture.

**Dataset Attributes**

Note that you should take advantage of the [dataset attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) added to the HTML elements in `index.html`:
- `data-choice-id`: Maps to which quiz result the choice should "count" for, as defined in `constants.js`. See details below for scoring and what to do if there are ties.
- `data-question-id`: Maps to the question number: one, two, and three.

You can access these attributes in JavaScript by using:
- element`.dataset.choiceId`
- element`.dataset.questionId`

And you can select these attributes via CSS selectors like the following:
- `[data-choice-id='blep']`
- `[data-question-id='two']`

---

**Clicking an answer**

When the user clicks an answer choice, the answer choices should update in the following way:

<img src="images/hw2-dog-answered.png" class="screenshot" />
- For the selected item:
  - The checkbox image should change from unchecked to checked
  - Background color is `#cfe3ff`
  - The checked image is `images/checked.png`
- For the unchosen items:
  - They should be made semi-transparent by setting their `opacity: 0.6;`
  - Note that only the unchosen items *for this question* should change style.

**Changing an answer**

If the user has not completed the quiz (i.e. there is at least one unanswered question), they should be able to change their answer to a question by clicking a different answer.

After the user has answered every question, the answer choices should lock and it should no longer be possible to change an answer, until the user clicks "Restart quiz" or refreshes the page.

**Completing the quiz**

After the user has answered all three questions, the quiz is complete.

- It should not be possible to select another answer after you've completed the quiz.
  - i.e. you click another dog after the quiz is complete, nothing on the page should change.
- The page should remain in this "completed" state until the user refreshes the page or clicks "Restart quiz".

The personality results should appear at the bottom of the page, with the personality data that corresponds to the dog, as defined by `constants.js`.

Here is the description of how the personality results should look:

<img src="images/hw2-dog-results.png" class="screenshot" />
- Result button
  - Background color is `#cecece`
  - On hover, the color should change to `#e0e0e0`
    <img src="images/hw2-result-hover.png" class="screenshot" />

**Scoring the quiz**

The `data-choice-id` for each answer choice maps to the key name for each possible result in `RESULTS_MAP`, stored in `constants.js`. You can access `RESULTS_MAP` in `script.js` because `constants.js` is included before `script.js` in `index.html`.

When the quiz is complete, you can score the quiz by tallying the `data-choice-id`s from each answer. For example, if a user chooses `blepdog.jpg`, `sleepybed.jpg`, and `bleptoy.jpg`, you should show the title and contents from `RESULTS_MAP['blep']`.

If there is a tie, i.e. if someone chooses all unique `data-choice-id`s, the answer to the first question should win. For example, if a user chooses `burgerdog.jpg`,  `nerdbed.jpg`, and `shydog.jpg`, you should show the title and contents from `RESULTS_MAP['burger']`.

**Resetting the quiz**

If the user clicks the "Restart quiz" button, the page should reset to its original state.

- The answer choices should return to their original appearance before the quiz was complete
- The personality results should disappear
- The answer choices should be selectable again, and clicking on a different set of answers should result in showing an updated personality type.
- The page should look and behave the same as if you had refreshed the page (but you should not actually refresh the page)
- You should also make the page scroll to the top of the "Pick a pup" element.
  - You can call `element.scrollIntoView();` to do this. See [mdn](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) for more details.

**`constants.js`**
- This file contains the definition of the object `RESULTS_MAP`, which maps the dog type to its result title and description.
- Because this variable is declared in the global scope, you can access this variable in `script.js`.
- You should **not** have to modify this file to solve the homework.

**`script.js`**
- This is the file in which we expect you to implement the quiz behavior.
- You should define and attach event listeners in this file.

**Image to personality mapping**

The `RESULTS_MAP` is defined in `constants.js` and the images are saved in the `images/` directory.

- `blep{dog,bed,toy}.jpg` corresponds to `blep` in `RESULTS_MAP`
- `happy{dog,bed,toy}.jpg` corresponds to `happy` in `RESULTS_MAP`
- `sleeping{dog,bed,toy}.jpg` corresponds to `sleeping` in `RESULTS_MAP`
- `dopey{dog,bed,toy}.jpg` corresponds to `dopey` in `RESULTS_MAP`
- `burger{dog,bed,toy}.jpg` corresponds to `burger` in `RESULTS_MAP`
- `cart{dog,bed,toy}.jpg` corresponds to `cart` in `RESULTS_MAP`
- `nerd{dog,bed,toy}.jpg` corresponds to `nerd` in `RESULTS_MAP`
- `shy{dog,bed,toy}.jpg` corresponds to `shy` in `RESULTS_MAP`
- `sleepy{dog,bed,toy}.jpg` corresponds to `sleepy` in `RESULTS_MAP`

**NOTE**: To make this easier to test, the items for each question are in the order displayed above, i.e. the first answer of every question maps to `blep`, the second answer of every question maps to `happy`, etc. **You should not rely on this ordering for your homework solution.** Instead, use the dataset attributes as described at the top of this section.

</section>



## Submit

