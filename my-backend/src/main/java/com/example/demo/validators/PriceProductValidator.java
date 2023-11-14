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
public class PriceProductValidator implements ConstraintValidator<ValidProductPrice, Product> {
  public static ApplicationContext myContext;
  @Autowired
  private ApplicationContext context;

  @Override
  public void initialize(ValidProductPrice constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(Product product, ConstraintValidatorContext constraintValidatorContext) {
    if (context == null) return true;
    if (context != null) myContext = context;
    ProductService repo = myContext.getBean(ProductServiceImpl.class);
    double sumPartsPrice = 0;
    if (product.getId() != 0) {
      Product myProduct = repo.findById((int) product.getId());
      for (Part p : myProduct.getParts()) sumPartsPrice = sumPartsPrice + p.getPrice();
        return product.getPrice() >= sumPartsPrice;
    } else {
      return true;
    }
  }
}
