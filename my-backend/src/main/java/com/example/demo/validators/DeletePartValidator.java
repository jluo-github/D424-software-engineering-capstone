package com.example.demo.validators;

import com.example.demo.domain.Part;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 *
 */
public class DeletePartValidator implements ConstraintValidator<ValidDeletePart, Part> {
  @Override
  public void initialize(ValidDeletePart constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(Part part, ConstraintValidatorContext constraintValidatorContext) {
      return part.getProducts().isEmpty();
  }
}
