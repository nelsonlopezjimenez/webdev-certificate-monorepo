# Assignment: Cookie Monster

# Full Stack Web Dev

## Lab: CSS Design and Layout (Flexbox Version)

The purpose of this lab is to practice writing Cascading Style Sheets to control the appearance and layout of a web page using modern CSS layout techniques.

## Victoria's Journal Web Page

The Cookie_Monster_Lab folder in the "Labs" folder contains all of the files you will need to work with to complete this lab.

You are given a file named index.html that represents a page from Victoria's journal. You are to create a new stylesheet called journal_layout.css that will transform the journal's layout in different ways throughout the following exercises.

To help you out, you are also given a file named basic.css that defines some basic styles for this page, and it is already linked for you in the index.html file already. You do not have to edit this provided stylesheet or the link; just edit the journal_layout.css that you're writing.

## Exercises for Today:

1. Arrange Your Page into Sections
2. Spacing With Padding and Margins, Backgrounds
3. Flexbox Layout and Alignment
4. Cosmetic Finishing Touches
5. Add 2nd Column: Friends List
6. Make Your Journal Annoying w/ Hover

---

## Exercise 1: Arrange Your Page into Sections (roughly 20 minutes)

The first task is to organize index.html by adding ids, classes, spans and divs where needed. Then, add visual "boxes" around these sections of the website by adding to your journal_layout.css stylesheet.

**Hint:** Remember the shorthand way to define a border in CSS:

```css
border: thickness color style;
```

For example, the following gives a yellow, dashed, 1px-thick border:

```css
border: 1px yellow dashed;
```

You are going to match the output below.

**Note:**
- The borders are all 5px thick and solid.
- The colors are the intuitive HTML color names, e.g. the red border is the HTML color red.
- You should not need define a class or id specifically for the h2s on this page.

**Hint:** To reduce the amount of id and class attributes you need to set in the HTML code, use CSS context selectors as appropriate.

The only major changes you should need to make to the HTML code are adding ids, classes, divs, and spans. You may also change the text of the journal if you like, such as changing it to your name or rewording the journal entries. But please don't spend a large amount of time doing this, so you can move on to the later exercises.

---

## Exercise 2: Spacing with Padding and Margins, Backgrounds (roughly 15 minutes)

You are now going to add padding, margins, and backgrounds to some of the parts you defined in Exercise 1. You should only have to change your journal_layout.css file, if you completed Exercise 1 correctly.

- The box with the **green border** should have a background color of white. It should have a margin of 7px on the top.

- The boxes with the **blue borders** should have a background color of #E8FBFB. It should have a padding of 5px (on all sides) and margin of 10px only on the top of the box (the margins for the remaining sides should be left at 0px).

- The overall page content area should become centered on the page, should have left and right margins of 10% and a background image using the provided file background.jpg.

---

## Exercise 3: Flexbox Layout and Alignment (roughly 20 minutes)

**Before beginning this section, Read:**
- [CSS Flexbox on MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [CSS Flexbox on W3Schools](https://www.w3schools.com/css/css3_flexbox.asp)

Now you're going to practice using flexbox for modern layout control. Flexbox provides a more predictable way to arrange elements compared to older float-based techniques. You may have to edit your index.html code as well as your journal_layout.css stylesheet.

**Goals:**
1. The heading text in the **red box** should appear on the right side of that section of the page.
2. The journal entry images should appear on the right side next to the surrounding text within the **blue boxes**.

**Key Flexbox Concepts You'll Need:**
- `display: flex` - enables flexbox on a container
- `justify-content` - controls horizontal alignment
- `align-items` - controls vertical alignment
- `flex-direction` - controls the main axis (row or column)
- `gap` - adds space between flex items

**Hints:**
- To position the heading in the red box to the right, make the red box a flex container and use `justify-content` to push content to the right.
- For the journal entries with images, make each blue box a flex container. You may want to wrap the text content in an additional element to better control the layout.
- Consider using `align-items: flex-start` to keep items aligned at the top of the container.
- Unlike float, flexbox keeps elements within their container boundaries automatically - no need for clearfix!

You are going to match the output shown in the images.

---

## Exercise 4: Cosmetic Finishing Touches (roughly 10 minutes)

Finally, we add some finishing touches to make the page look its best.

- Change the border of the box with the **green border** to be a solid, white, 10px-thick border.

- Change the border of the boxes with the **blue border** to have a solid, 4px-thick border, using the hex value #C2E9E9 for its color.

- Change the border of the box with the **purple border** to have only a bottom border, and let that bottom border be blue, dashed, and 2px-thick.

- Change the background color of the box with the **red border** to be #A8F0F0 and get rid of its border altogether.

- Change the font size of "So fresh and so clean" to 14pt and get rid of its border.

---

## Exercise 5 (advanced): Add 2nd Column: Friends List (roughly 15 minutes)

If you manage to complete the first four exercises before lab time is up, work on adding a second column to the layout. You should copy and paste the following code into your index.html:

```html
<h1>Friends</h1>
<ul>
  <li>Unloop Buddies</li>
  <li>Jax the Maine Coon</li>
  <li>Freddie the Jack Russell</li>
</ul>
```

Use flexbox to make this list into a second, left-aligned column as shown in the images. The layout with a second column must still be a "liquid" layout -- that is, all parts of it should adjust in size accordingly when the browser size changes.

**Flexbox Hints:**
- You'll need a container element that wraps both the Friends list and the main content area.
- This container should use `display: flex` to create the two-column layout.
- Consider what the default `flex-direction` is (row) and how items arrange themselves along the main axis.
- Use `flex` property on child elements to control how much space each column takes up. For example:
  - Friends sidebar might use `flex: 0 0 300px` (don't grow, don't shrink, stay at 300px)
  - Main content might use `flex: 1` (take up remaining space)
- Add `gap` between columns for spacing.

**Resources:**
- [Flexbox flex property on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)
- [CSS Layout with Flexbox on W3Schools](https://www.w3schools.com/css/css3_flexbox_container.asp)

---

## Exercise 6 (advanced): Make Your Journal Annoying w/ Hover – Elegantly (roughly 10 minutes)

### Challenge A:
Write your page so that if you hover over any element (i.e. any header, paragraph, image, etc), the element is highlighted in yellow.

**This must be a one-selector, one-property addition to your stylesheet -- no commas allowed!**

**Hint:** Think about using the universal selector in combination with a pseudo-class.

### Challenge B:
Add smooth transitions to all hover effects on your page with a single CSS rule that affects every element.

**This must also be a one-selector, one-property addition to your stylesheet.**

**Hint:** Look into the `transition` property and how it can be applied universally.

**Resources:**
- [CSS :hover pseudo-class on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover)
- [CSS Transitions on W3Schools](https://www.w3schools.com/css/css3_transitions.asp)

---

## Summary of Key Concepts

**Flexbox Benefits Over Float:**
- Automatic height matching of flex items
- No need for clearfix hacks
- Easier alignment (both horizontal and vertical)
- More predictable behavior
- Better for responsive design
- Items stay within container boundaries automatically

**When to Use Flexbox:**
- One-dimensional layouts (rows or columns)
- Aligning items within a container
- Distributing space between items
- Creating flexible, responsive components

---

Good luck! Remember to test your page at different browser widths to ensure your layout is truly "liquid" and responsive.

The purpose of this assignment is to practice writing Cascading Style Sheets to control the appearance and layout of a web page.

## Getting Started

Download and extract the [Cookie_Monster](/link/needed/to/resource) folder. It contains all of the files you will need to work with to complete this assignment.

In this folder you will find:

- An `index.html` file that represents a page from Victoria's journal. You will not be editing this page.
- A css folder that contains:
  - a `basic.css` file, it defines some basic styles for this page. It is already linked for you in the index.html file. You _will_ not edit this stylesheet or the link,
  - a `journal_layout.css` file, any CSS rules that you create will be in this file.
- An image folder containing 5 jpg, png, and gif images that the webpage uses.
- An `instructions.md` file that contains all the requirements for this assignment

## Requirements

Create rules for the following effects, keep in mind you need to accomplish this _without_ modifying the index.html in anyway. I.E. adding id's or classes:

1.  `main`

    - a white border, that is 10px thick
    - a white background
    - a margin of 7px on the top only
    - the element should only take up 80% of it's parents total width.
    - margin should automatically balance left and right with consideration to width

1.  header

    - a #A8F0F0 background
    - all text should be on the right side of the box

1.  h2 in the header

    - the text should be a size of 14pt

1.  `article`

    - a border color of #C2E9E9, a thickness of 4px, and be solid
    - a background color of #E8FBFB
    - a padding of 5px on all sides
    - a margin of 10px on the top only
    - child items should flex so that:
      - section elements are on the left
      - image elements are on the right
    - h2's should be full width
    - the section elements should be 75% of its parents width
    - images should be 25% of its parents width

1.  spans in an h2

    - a `blue` dashed 2px thick on bottom only border

1.  body

    - background needs to be the `background.jpg` provided in the images folder
