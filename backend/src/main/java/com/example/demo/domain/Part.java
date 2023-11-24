package com.example.demo.domain;

import com.example.demo.validators.ValidDeletePart;
import com.example.demo.validators.ValidInventoryMaxMin;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 *
 */
@Entity
@ValidDeletePart
@ValidInventoryMaxMin
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "part_type", discriminatorType = DiscriminatorType.INTEGER)
@Table(name = "Parts")
public abstract class Part implements Serializable {


  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)

  long id;

  @Column(name = "part_name")
  String name;

  @Column(name = "part_price")
  @Min(value = 0, message = "Price value must be positive")
  double price;

  @Column(name = "part_inv")
  @Min(value = 0, message = "Inventory value must be positive")
  int inv;

  @Column(name = "part_max")
  // add Max and Min fields to Part class
  @Min(value = 0, message = "Max value must be positive")
  Integer max;

  @Column(name = "part_min")
  @Min(value = 0, message = "Min value must be positive")
  Integer min;


  @ManyToMany
  @JoinTable(name = "product_part", joinColumns = @JoinColumn(name = "partId"),
      inverseJoinColumns = @JoinColumn(name = "product_id"))
  Set<Product> products = new HashSet<>();

  public Part() {
  }

  //add Max and Min fields to Part constructor
  public Part(String name, double price, int inv, Integer max, Integer min) {
    this.name = name;
    this.price = price;
    this.inv = inv;
    this.max = max;
    this.min = min;
  }

  public Part(long id, String name, double price, int inv, Integer max, Integer min) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.inv = inv;
    this.max = max;
    this.min = min;
  }

  //add Max and Min getters and setters
  public Integer getMax() {
    return max;
  }

  public void setMax(Integer max) {
    this.max = max;
  }

  public Integer getMin() {
    return min;
  }

  public void setMin(Integer min) {
    this.min = min;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public int getInv() {
    return inv;
  }

  public void setInv(int inv) {
    this.inv = inv;
  }

  public Set<Product> getProducts() {
    return products;
  }

  public void setProducts(Set<Product> products) {
    this.products = products;
  }

  public String toString() {
    return this.name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Part part = (Part) o;

    return id == part.id;
  }

  @Override
  public int hashCode() {
    return (int) (id ^ (id >>> 32));
  }
}
