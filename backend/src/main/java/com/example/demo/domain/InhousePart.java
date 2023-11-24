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

  public InhousePart(String cat1, int i, int i1, int i2, int i3, int i4) {
    super(cat1, i, i1, i2, i3);
    this.partId = i4;
  }

  public InhousePart(long l, String pink1, int i, int i1, int i2, int i3, int i4) {
    super(l, pink1, i, i1, i2, i3);
    this.partId = i4;
  }

  public int getPartId() {

    return partId;
  }

  public void setPartId(int partId) {

    this.partId = partId;
  }
}
