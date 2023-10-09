# WESTERN GOVERNOR UNIVERSITY

## D287 – JAVA FRAMEWORKS

> WEB-BASED SPRING INVENTORY APPLICATION: [PurpleCat PC Store](http://localhost:8080/mainscreen)

C. Customize the HTML user interface for your customer’s application. The user interface should include the shop name,
the product names, and the names of the parts.

> - mainscreen.html, line 26, change title name.
>- mainscreen.html, line 27, change store name.

D. Add an “About” page to the application to describe your chosen customer’s company to web viewers and include
navigation to and from the “About” page and the main screen.

> - about.html, line 1-27, add "About" page.
>- mainscreen.html, line 30-33, add "About" page link.
>- MainScreenController.java, line 54-57, add @GetMapping for about page.

E. Add a sample inventory appropriate for your chosen store to the application. You should have five parts and five
products in your sample inventory and should not overwrite existing data in the database.

> - BootStrapData, line 60-213, add 5 parts and 5 products to the sample inventory.

F. Add a “Buy Now” button to your product list. Your “Buy Now” button must meet each of the following parameters:
• The “Buy Now” button must be next to the buttons that update and delete products.

> - mainscreen.html, line 122-123, create buy now button.

• The button should decrement the inventory of that product by one. It should not affect the inventory of any of the
associated parts.

> - AddProductController.java, line 131-147, make the buy now button work.

• Display a message that indicates the success or failure of a purchase.

> - comfirmationboughtoneproduct.html, line 1-24, add confirmation page for buy now button to display the message.

G. Modify the parts to track maximum and minimum inventory by doing the following:
• Add additional fields to the part entity for maximum and minimum inventory.

> - Part.java, line 35-39, add Max and Min variables.
>- Part.java, line 51-66, add Max and Min fields to Part constructor.
>- Part.java, line 69-81, add Max and Min getters and setters.

• Modify the sample inventory to include the maximum and minimum fields.

> - BootStrapData.java, line 64-153, add Max and Min fields to Part entity.

• Add to the InhousePartForm and OutsourcedPartForm forms additional text inputs for the inventory so the user can set
the maximum and minimum values.

> - inhousepartform.html, line 37-39, add Max and Min inputs to form.
>- outsourcedpartform.html, line 35-38, add Max and Min inputs to form.
>- mainscreen.html, line 62-73, add Max and Min field to table.

• Rename the file the persistent storage is saved to.

> - application.properties, line 8, change the persistent storage file name.

• Modify the code to enforce that the inventory is between or at the minimum and maximum value.

> - ValidInventoryMaxMin.java, line 1-24, add validation for Max and Min fields.
>- InventoryMaxMinValidator.java, line 1-51, add validator class for Max and Min fields.
>- Part.java, line 17, add @ValidInventoryMaxMin annotation to Part class.

H. Add validation for between or at the maximum and minimum fields. The validation must include the following:

• Display error messages for low inventory when adding and updating parts if the inventory is less than the minimum
number of parts.

> - InhousePartForm.html, line 45-49 ,add Error messages for low inventory.
>- OutsourcedPartForm.html, line 46-50 ,add Error messages for low inventory.

• Display error messages for low inventory when adding and updating products lowers the part inventory below the
minimum.

> - EnufPartsValidator.java, line 41-45 , add validation for associating parts when adding and updating products lowers
    the part inventory below the minimum.
>- InhousePartForm.html, line 45-49 ,add Error messages for low inventory.
>- OutsourcedPartForm.html, line 46-50 ,add Error messages for low inventory.

• Display error messages when adding and updating parts if the inventory is greater than the maximum.

> - InhousePartForm.html, line 45-49,add Error messages
>- OutsourcedPartForm.html, line 46-50,add Error messages

I. Add at least two unit tests for the maximum and minimum fields to the PartTest class in the test package.

> - PartTest.java, line 103-141 , add 4 unit tests for Max and Min.

J. Remove the class files for any unused validators in order to clean your code.

> - DeletePartValidator.java, line 1-23, unused validator, remove the class file.


