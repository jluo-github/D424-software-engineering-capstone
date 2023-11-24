package com.example.demo.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 *
 */
@Entity
@DiscriminatorValue("2")
public class OutsourcedPart extends Part {
  String companyName;

  public OutsourcedPart() {
  }

  public OutsourcedPart(String cat2, int i, int i1, int i2, int i3, String company1) {
    super(cat2, i, i1, i2, i3);
    this.companyName = company1;
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

}
