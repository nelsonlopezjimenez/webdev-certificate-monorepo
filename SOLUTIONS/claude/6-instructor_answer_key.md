# AllRecipes HTML - Intentional Errors Answer Key
## For Instructor Reference Only

This document lists all intentional validation errors in the index.html file that students must find and fix using the W3C validator.

---

## Errors Included (Total: 9 errors)

### 1. Missing `alt` attribute on image (Line ~20)
**Location:** Header section
```html
<img src="allrecipes-logo.png" width="300">
```
**Error:** Image missing required `alt` attribute
**Fix:** 
```html
<img src="allrecipes-logo.png" alt="All Recipes Logo" width="300">
```

---

### 2. Missing closing tag for `<h2>` (Line ~57)
**Location:** About section
```html
<h2>About This Recipe
<img src="spatula.png" alt="spatula icon" width="50">
```
**Error:** Opening `<h2>` tag never closed
**Fix:**
```html
<h2>About This Recipe</h2>
<img src="spatula.png" alt="spatula icon" width="50">
```

---

### 3. Missing `cup` text (Line ~71)
**Location:** Ingredients list
```html
<li>1/4 brown sugar</li>
```
**Error:** Not a validation error, but inconsistent with other ingredients (missing "cup" unit)
**Fix:**
```html
<li>1/4 cup brown sugar</li>
```
**Note:** This won't be caught by validator, but students should notice the inconsistency.

---

### 4. Missing closing tag for `<li>` (Line ~72)
**Location:** Ingredients list
```html
<li>1/4 teaspoon ground cinnamon
<li>1/8 teaspoon ground nutmeg</li>
```
**Error:** First `<li>` tag never closed
**Fix:**
```html
<li>1/4 teaspoon ground cinnamon</li>
<li>1/8 teaspoon ground nutmeg</li>
```

---

### 5. Duplicate `id` attribute (Line ~103)
**Location:** Reviews section, first review
```html
<section id="one" id="review-1">
```
**Error:** Element has two `id` attributes
**Fix:**
```html
<section id="one">
```
OR
```html
<section id="review-1">
```
OR (if you want both identifiers):
```html
<section id="one" class="review">
```

---

### 6. Missing `alt` attribute on image (Line ~105)
**Location:** First review user image
```html
<img src="user1.jpg" width="80">
```
**Error:** Image missing required `alt` attribute
**Fix:**
```html
<img src="user1.jpg" alt="User profile picture" width="80">
```

---

### 7. Missing `alt` attribute on image (Line ~126)
**Location:** Second review user image
```html
<img src="user2.jpg" width="80">
```
**Error:** Image missing required `alt` attribute
**Fix:**
```html
<img src="user2.jpg" alt="User profile picture" width="80">
```

---

### 8. Missing `alt` attribute on image (Line ~146)
**Location:** Third review user image
```html
<img src="user3.jpg" width="80">
```
**Error:** Image missing required `alt` attribute
**Fix:**
```html
<img src="user3.jpg" alt="User profile picture" width="80">
```

---

### 9. Wrong closing tag `<p>` (Line ~148)
**Location:** Third review username
```html
<p class="username">ellagofood<p>
```
**Error:** Opening `<p>` tag closed with another opening `<p>` tag instead of `</p>`
**Fix:**
```html
<p class="username">ellagofood</p>
```

---

## Error Summary by Type:

- **Missing alt attributes:** 4 instances (logo, 3 user images)
- **Unclosed tags:** 2 instances (h2, li)
- **Duplicate id attribute:** 1 instance
- **Wrong closing tag:** 1 instance (p tag)
- **Content inconsistency:** 1 instance (not a validation error)

---

## Expected Student Workflow:

1. Run index.html through W3C validator
2. Receive ~8 errors (content inconsistency won't be caught)
3. Fix each error one by one
4. Re-validate until passing
5. Manually check content for logical consistency (the missing "cup" unit)
6. Proceed to Part A of the CSS lab

---

## Teaching Notes:

These errors represent common student mistakes:
- **Forgetting alt attributes** - Very common, teaches accessibility
- **Not closing tags** - Classic beginner error
- **Duplicate attributes** - Shows importance of careful HTML writing
- **Wrong closing tags** - Easy typo to make
- **Content inconsistency** - Teaches attention to detail beyond validation

The errors are realistic and not overly difficult, allowing students to build confidence while learning to use validation tools effectively.
