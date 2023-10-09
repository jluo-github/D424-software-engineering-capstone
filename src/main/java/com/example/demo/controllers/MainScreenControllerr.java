//package com.example.demo.controllers;
//
//import com.example.demo.domain.Part;
//import com.example.demo.domain.Product;
//import com.example.demo.service.PartService;
//import com.example.demo.service.ProductService;
//import org.springframework.data.repository.query.Param;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
///**
// *
// */
//
//@RestController
//public class MainScreenControllerr {
//  // private final PartRepository partRepository;
//  // private final ProductRepository productRepository;'
//
//  private final PartService partService;
//  private final ProductService productService;
//
//  private List<Part> theParts;
//  private List<Product> theProducts;
//
//// /*   public MainScreenControllerr(PartRepository partRepository, ProductRepository productRepository) {
////        this.partRepository = partRepository;
////        this.productRepository = productRepository;
////    }*/
//
//  public MainScreenControllerr(PartService partService, ProductService productService) {
//    this.partService = partService;
//    this.productService = productService;
//  }
//
//  @GetMapping("/mainscreen")
//  public String listPartsandProducts(Model theModel,
//                                     @Param("partkeyword") String partkeyword, @Param("productkeyword") String productkeyword) {
//
//    //add to the sprig model
//    List<Part> partList = partService.listAll(partkeyword);
//    theModel.addAttribute("parts", partList);
//    theModel.addAttribute("partkeyword", partkeyword);
//
//
//    //    theModel.addAttribute("products",productService.findAll());
//    List<Product> productList = productService.listAll(productkeyword);
//    theModel.addAttribute("products", productList);
//    theModel.addAttribute("productkeyword", productkeyword);
//    return "mainscreen";
//  }
//
//
//  @GetMapping("/about")
//  public String about() {
//    return "about";
//  }
//
//}
