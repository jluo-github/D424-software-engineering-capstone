package com.example.demo.validators;

import com.example.demo.domain.Part;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class InventoryMaxMinValidator implements
    ConstraintValidator<ValidInventoryMaxMin, Part> {

  @Override
  public void initialize(ValidInventoryMaxMin constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(Part part,
                         ConstraintValidatorContext constraintValidatorContext) {


    boolean isValid = (part.getInv() >= part.getMin()
        && part.getInv() <= part.getMax());

    if (part.getMax() == null || part.getMin() == null) {
      return true;
    }

    if (part.getInv() < part.getMin()) {
      System.out.println("part.getInv() < part.getMin()");
      constraintValidatorContext.disableDefaultConstraintViolation();
      constraintValidatorContext.buildConstraintViolationWithTemplate(
          "Inventory cannot be less than Min!!!"
      ).addConstraintViolation();
    }
    if (part.getInv() > part.getMax()) {
      System.out.println("part.getInv() > part.getMax()");
      constraintValidatorContext.disableDefaultConstraintViolation();
      constraintValidatorContext.buildConstraintViolationWithTemplate(
          "Inventory cannot be greater than Max!!!"
      ).addConstraintViolation();
    }
    if (part.getMax() < part.getMin()) {
      System.out.println("part.getMax() < part.getMin()");
      constraintValidatorContext.disableDefaultConstraintViolation();
      constraintValidatorContext.buildConstraintViolationWithTemplate(
          "Max cannot be less than Min!!!"
      ).addConstraintViolation();
    }
    return isValid;
  }
}
