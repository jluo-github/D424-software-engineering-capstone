// package com.example.demo;

// import com.example.demo.domain.InhousePart;
// import com.example.demo.domain.OutsourcedPart;
// import com.example.demo.domain.Part;
// import com.example.demo.repositories.PartRepository;
// import com.example.demo.service.PartServiceImpl;
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
// public class PartServiceTest {
// @Mock
// private PartRepository partRepository;
// @InjectMocks
// private PartServiceImpl partService;

// @Test
// public void findAll() {
// when(partRepository.findAll()).thenReturn(Arrays.asList(
// new InhousePart("Pink1", 11, 10,22,2,10001),
// new OutsourcedPart("Pink2", 22, 20,22,2,"Company1")
// ));
// List<Part> parts = partService.findAll();
// assertEquals("Pink1", parts.get(0).getName());
// assertEquals(22, parts.get(1).getPrice());
// }

// @Test
// public void findById() {
// Part part = new InhousePart("Pink3", 11, 10,22,2,10001);
// when(partRepository.findById(100L)).thenReturn(Optional.of(part));
// Part result = partService.findById(100);
// assertEquals("Pink3", result.getName());
// }

// @Test
// public void save() {
// InhousePart part = new InhousePart(400L,"Pink4", 11, 10,22,2,10001);
// partService.save(part);
// verify(partRepository, times(1)).save(part);
// }

// @Test
// public void deleteById() {
// Part part = new InhousePart(500,"Pink5", 11, 10,22,2,10001);
// partService.deleteById(500);
// verify(partRepository, times(1)).deleteById(500L);
// }
// }
