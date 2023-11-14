package com.example.demo.validators;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.FIELD, ElementType.PARAMETER,
})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {InventoryMaxMinValidator.class})


public @interface ValidInventoryMaxMin {

  String message() default "Inventory must be between or at the Max and Min value!!!";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
