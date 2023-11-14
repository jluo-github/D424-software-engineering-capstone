package com.example.demo.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 *
 */
@Entity
@DiscriminatorValue("1")
public class InhousePart extends Part {
  int partId;

  public InhousePart() {
  }

  public InhousePart(int partId) {
    this.partId = partId;
  }

  public int getPartId() {

    return partId;
  }

  public void setPartId(int partId) {

    this.partId = partId;
  }
}
