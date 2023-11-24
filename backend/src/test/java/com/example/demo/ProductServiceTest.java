// package com.example.demo;

// import com.example.demo.domain.Product;
// import com.example.demo.repositories.ProductRepository;
// import com.example.demo.service.ProductServiceImpl;
// import org.junit.Test;
// import org.junit.runner.RunWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.MockitoJUnitRunner;

// import java.util.Arrays;
// import java.util.List;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.Mockito.*;

// @RunWith(MockitoJUnitRunner.class)
// public class ProductServiceTest {
// @Mock
// private ProductRepository productRepository;
// @InjectMocks
// private ProductServiceImpl productService;
// @Test
// public void findAll() {
// when(productRepository.findAll()).thenReturn(Arrays.asList(
// new Product("Cat1", 11, 10),
// new Product("Cat2", 22, 20)
// ));
// List<Product> products = productService.findAll();
// assertEquals("Cat1", products.get(0).getName());
// assertEquals(22, products.get(1).getPrice());
// }

// @Test
// public void findById() {
// Product product = new Product(100,"Cat3", 11, 10);
// when(productRepository.findById(100L)).thenReturn(Optional.of(product));
// Product result = productService.findById(100);
// assertEquals("Cat3", result.getName());
// }

// @Test
// public void save() {
// Product product = new Product(400,"Cat4", 11, 10);
// productService.save(product);
// verify(productRepository, times(1)).save(product);
// }

// @Test
// public void deleteById() {
// Product product = new Product(500,"Cat5", 11, 10);
// productService.deleteById(500);
// verify(productRepository, times(1)).deleteById(500L);
// }

// }
