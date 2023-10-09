package com.example.demo.validators;

import com.example.demo.domain.Part;
import com.example.demo.domain.Product;
import com.example.demo.service.ProductService;
import com.example.demo.service.ProductServiceImpl;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

/**
 *
 */
public class EnufPartsValidator implements ConstraintValidator<ValidEnufParts, Product> {
  public static ApplicationContext myContext;
  @Autowired
  private ApplicationContext context;

  @Override
  public void initialize(ValidEnufParts constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(Product product, ConstraintValidatorContext constraintValidatorContext) {
    if (context == null) return true;
    if (context != null) myContext = context;

    ProductService repo = myContext.getBean(ProductServiceImpl.class);

    if (product.getId() != 0) {
      Product myProduct = repo.findById((int) product.getId());

      for (Part p : myProduct.getParts()) {

        if (p.getInv() < (product.getInv() - myProduct.getInv()))
          return false;

        // add validation for associating parts
        // when adding and updating products lowers the part inventory below the minimum
        if (p.getInv() - (product.getInv() - myProduct.getInv()) < p.getMin()) {
          return false;
        }

        if (p.getInv() < 0)
          return false;

      }


      return true;
    } else {
      return true;
    }
  }
}
