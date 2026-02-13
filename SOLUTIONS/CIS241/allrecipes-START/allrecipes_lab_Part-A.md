# Full Stack Web Development
## All-Recipes Lab (Flexbox Version)

In this assignment, you will be given a HTML file named "index.html" along with pictures and a video. You will apply CSS styling to this page to make it better suited for reading on the web using modern layout techniques. Just like in our ASPCA website, we are creating a simplified version of a real-life website called allrecipes.com.

## Learning Objectives:
- Practice CSS styling and selectors (color, border, images, hr, and more)
- Use flexbox for modern, flexible layouts
- Use CSS Grid as an alternative for specific layout patterns
- Use favicon icon for the first time
- Practice using pseudo classes and pseudo elements
- Create responsive websites using viewport units and media queries

Once the CSS styling is applied, your website should look *something* like the screenshots provided.
![Peach Cobbler](image.png)

Website as zoomed out from 50% view.
---

## Part A: HTML Setup and Desktop Styling

### HTML Preparation

Before we get started on styling our web page there are a few things we need to do!

1. **Validation**: Run index.html through the w3c validation checker. It *must pass* the w3c validation checker before you move on to the next steps.

2. **Folder structure**: Move all of your images to an appropriate "images" folder. Move the video to an appropriate "videos" folder. Now you must fix the broken links on your index.html page.

3. **Favicon**: Now, you will add a "favicon" image to your web page.

   A "favicon" is an icon associated with a URL that is displayed in a browser's address bar or next to the site name in a bookmark list.

   To add a favicon image to your site add the following text to the `<head>` section of your HTML page:

   ```html
   <link rel="icon" type="image/png" href="images/favicon.png" />
   ```

   You should see an orange logo pop up next to your web page's "title" in your browser tab.

   ![favicon](image-1.png)

---

### CSS Styling

Time to style our page! Be aware that only some of the essential CSS styling is listed below. Look closely at the screenshot of the page to match the website as closely as you can. Some things such as padding or margins may not be listed.

**Resources:**
- [Flexbox on MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [Flexbox on W3Schools](https://www.w3schools.com/css/css3_flexbox.asp)
- [CSS Grid on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Grid on W3Schools](https://www.w3schools.com/css/css_grid.asp)

#### Body:
- Body should take up less than 100% of the screen's width
- Body content should be centered horizontally on the page
- Font of the website is "Verdana"
- Background color of the page is "#e6e6e6"

#### Main Content Container

You'll need a wrapper element around your main content to create the two-column layout for the recipe and about sections.

**Using Flexbox:**
- Create a container that holds both `#recipe` and `#about` sections
- Use `display: flex` on this container
- `#about` section should have a width (or flex-basis) of 60%
- `#recipe` section should take up the remaining space
- Add appropriate gap between columns

**HTML Structure Hint:**
```html
<div class="content-wrapper">
  <section id="recipe">...</section>
  <section id="about">...</section>
</div>
```

#### #main_content
- Background color must be white

#### Video Section

The video and its container should be positioned within the `#about` section.

**Using Flexbox:**
- The video container should have a width of 40% (or use flex-basis)
- Consider using flexbox within the `#about` section if you need to arrange multiple elements

#### Header:
- Background color is: `rgba(226, 225, 225, 0.42)`

#### Horizontal rules:
- `border-color: orange;`

---

### Ingredients List (Unordered List)

This section creates a two-column layout for the ingredient list. You have two options:

#### Option 1: Using Flexbox (Recommended for this section)

Do these steps in order to see the changes as they come!

1. Apply `display: flex` to the `<ul>` element
2. Use `flex-wrap: wrap` to allow items to wrap to the next row
3. Set each `<li>` to `flex: 0 0 50%` (don't grow, don't shrink, take 50% width)
   - This creates a two-column layout!
4. Add some `gap` or adjust padding for spacing between items

#### Option 2: Using CSS Grid (Alternative approach)

CSS Grid is actually better suited for this type of layout:

```css
ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal columns */
  gap: 10px; /* Space between items */
}
```

**Replacing Bullet Points with Icons:**

Now, we will replace the list item bullets with an image using a pseudo-element. We'll use the `::before` pseudo-element with a background image (this approach is more flexible for responsive design).

Add the following to your CSS:

```css
ul li::before {
  content: '';
  background-image: url('../images/plus-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
  display: inline-block;
  margin-right: 8px;
}
```

**Why use background-image instead of content: url()?**
- More control over sizing with `background-size`
- Better for responsive design
- Can easily adjust with media queries

Now remove the default bullets by setting:
```css
ul {
  list-style: none;
}
```

**Hover Effect:**

When each individual ingredient is hovered over, make the background color: `rgba(255, 165, 0, 0.39)`.

**Hint:** You need to select the list items on hover. The selector would be: `ul li:hover`

---

### Save Button:

1. Resize the Save button to be larger
2. Change the background color to orange and the font color to white
3. Round out the corners and remove the border:
   ```css
   border-radius: 2%;
   border-width: 0;
   ```
4. Add a hover action using the `:hover` pseudo-class. The Save button's color should change to `rgba(255, 165, 0, 0.39)` when hovered over

**Hint:** The selector for hovering over the save button would be something like `.save-button:hover` or `#save-button:hover` depending on your HTML.

---

### Share Section:
- Images must be resized appropriately

---

### Reviews Section (#one, #two, #three)

Create a three-column layout for the reviews.

**Using Flexbox:**

1. Create a container for all reviews (might be `#reviews` or similar)
2. Apply `display: flex` to this container
3. Each review (`#one`, `#two`, `#three`) should automatically take equal space
   - Use `flex: 1` on each review to distribute space equally
   - OR set each to `flex: 0 0 33.33%` for explicit thirds
4. Add `gap` for spacing between reviews

**Additional Styling:**
- Images must be resized
- Use `border-radius: 50%` to turn images into circles
- Each individual review must have a "dotted" border style of color "orange"
- Border width should be 5px

**Example:**
```css
#reviews {
  display: flex;
  gap: 20px;
}

#one, #two, #three {
  flex: 1; /* Equal width columns */
  border: 5px dotted orange;
  /* Add padding as needed */
}

#reviews img {
  border-radius: 50%;
  /* Set appropriate width/height */
}
```

---

### Star Reviews HTML Edit:

Add a `<div>` tag with class value of "star-reviews" around each section of stars. This will bring the stars down to their own line as they will be treated as block elements.

```html
<div class="star-reviews">
  <img src="..." alt="star">
  <img src="..." alt="star">
  <!-- more stars -->
</div>
```

---

### #number-reviews span
- Font color should be grey

---
