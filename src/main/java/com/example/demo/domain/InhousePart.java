package com.example.demo.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 *
 */
@Entity
@DiscriminatorValue("1")
public class InhousePart extends Part {
    int partInhouseId;

    public InhousePart() {
    }

    public InhousePart(int partInhouseId) {
        this.partInhouseId = partInhouseId;
    }

    public int getPartId() {
        return partInhouseId;
    }

    public void setPartId(int partInhouseId) {
        this.partInhouseId = partInhouseId;
    }
}
