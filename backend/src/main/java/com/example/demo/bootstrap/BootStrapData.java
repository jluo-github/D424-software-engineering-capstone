package com.example.demo.bootstrap;

import com.example.demo.domain.InhousePart;
import com.example.demo.domain.OutsourcedPart;
import com.example.demo.domain.Product;
import com.example.demo.repositories.InhousePartRepository;
import com.example.demo.repositories.OutsourcedPartRepository;
import com.example.demo.repositories.PartRepository;
import com.example.demo.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 *
 */
@Component
public class BootStrapData implements CommandLineRunner {

    private final PartRepository partRepository;
    private final ProductRepository productRepository;

    private final OutsourcedPartRepository outsourcedPartRepository;
    private final InhousePartRepository inhousePartRepository;

    public BootStrapData(PartRepository partRepository, ProductRepository productRepository, OutsourcedPartRepository outsourcedPartRepository, InhousePartRepository inhousePartRepository) {
        this.partRepository = partRepository;
        this.productRepository = productRepository;
        this.outsourcedPartRepository = outsourcedPartRepository;
        this.inhousePartRepository = inhousePartRepository;
    }

    @Override
    public void run(String... args) throws Exception {

       /*
        OutsourcedPart o= new OutsourcedPart();
        o.setCompanyName("Western Governors University");
        o.setName("out test");
        o.setInv(5);
        o.setPrice(20.0);
        o.setId(100L);
        outsourcedPartRepository.save(o);
        OutsourcedPart thePart=null;
        List<OutsourcedPart> outsourcedParts=(List<OutsourcedPart>) outsourcedPartRepository.findAll();
        for(OutsourcedPart part:outsourcedParts){
            if(part.getName().equals("out test"))thePart=part;
        }

        System.out.println(thePart.getCompanyName());
        */
        /*
        Product bicycle= new Product("bicycle",100.0,15);
        Product unicycle= new Product("unicycle",100.0,15);
        productRepository.save(bicycle);
        productRepository.save(unicycle);
        */

        if (partRepository.count() == 0 && productRepository.count() == 0) {
            // add OutsourcedPart objects to the database:
            OutsourcedPart PSU = new OutsourcedPart();

            PSU.setName("PSU");
            PSU.setPrice(100.0);
            PSU.setInv(25);
            PSU.setMax(50);
            PSU.setMin(2);
            PSU.setCompanyName("PurpleCat");

            OutsourcedPart PSUSaved = outsourcedPartRepository.save(PSU);
            OutsourcedPart thePart = null;

            List<OutsourcedPart> outsourcedParts = outsourcedPartRepository.findAll();
            for (OutsourcedPart part : outsourcedParts) {
                if (part.getName().equals("PSU"))
                    thePart = part;
                System.out.println(part.getName() + " " + part.getCompanyName());
            }

            System.out.println(thePart.getCompanyName());

            // add InhousePart objects to the database:
            InhousePart CPU = new InhousePart();
            CPU.setName("CPU");
            CPU.setPrice(700.0);
            CPU.setInv(25);
            CPU.setMax(50);
            CPU.setMin(2);

            CPU.setPartId(101);

            InhousePart CPUSaved = inhousePartRepository.save(CPU);
            InhousePart thePart1 = null;

            List<InhousePart> inhouseParts = inhousePartRepository.findAll();
            for (InhousePart part : inhouseParts) {
                if (part.getName().equals("CPU"))
                    thePart1 = part;
                System.out.println(part.getName() + " " + part.getPartId());
            }

            System.out.println(thePart1.getPartId());

            InhousePart GPU = new InhousePart();
            GPU.setName("GPU");
            GPU.setPrice(600.0);
            GPU.setInv(25);
            GPU.setMax(50);
            GPU.setMin(2);

            GPU.setPartId(102);

            InhousePart GPUSaved = inhousePartRepository.save(GPU);
            InhousePart thePart2 = null;

            List<InhousePart> inhouseParts2 = inhousePartRepository.findAll();
            for (InhousePart part : inhouseParts2) {
                if (part.getName().equals("GPU"))
                    thePart2 = part;
                System.out.println(part.getName() + " " + part.getPartId());
            }

            System.out.println(thePart2.getPartId());

            InhousePart RAM = new InhousePart();
            RAM.setName("RAM");
            RAM.setPrice(150.0);
            RAM.setInv(25);
            RAM.setMax(50);
            RAM.setMin(2);

            RAM.setPartId(103);

            InhousePart RAMSaved = inhousePartRepository.save(RAM);
            InhousePart thePart3 = null;

            List<InhousePart> inhouseParts3 = inhousePartRepository.findAll();
            for (InhousePart part : inhouseParts3) {
                if (part.getName().equals("RAM"))
                    thePart3 = part;
                System.out.println(part.getName() + " " + part.getPartId());
            }

            System.out.println(thePart3.getPartId());

            InhousePart SSD = new InhousePart();
            SSD.setName("SSD");
            SSD.setPrice(200.0);
            SSD.setInv(25);
            SSD.setMax(50);
            SSD.setMin(2);
            SSD.setPartId(104);

            InhousePart SSDSaved = inhousePartRepository.save(SSD);
            InhousePart thePart4 = null;

            List<InhousePart> inhouseParts4 = inhousePartRepository.findAll();
            for (InhousePart part : inhouseParts4) {
                if (part.getName().equals("SSD"))
                    thePart4 = part;
                System.out.println(part.getName() + " " + part.getPartId());
            }

            System.out.println(thePart4.getPartId());

            // add Product objects to the database:
            Product GamePC1 = new Product("GamePC1", 1800.0, 12);
            Product GamePC2 = new Product("GamePC2", 2100.0, 12);
            Product GamePC3 = new Product("GamePC3", 2400.0, 12);
            Product GamePC4 = new Product("GamePC4", 2700.0, 12);
            Product GamePC5 = new Product("GamePC5", 2900.0, 12);

            Product GamePC1Saved = productRepository.save(GamePC1);
            Product GamePC2Saved = productRepository.save(GamePC2);
            Product GamePC3Saved = productRepository.save(GamePC3);
            Product GamePC4Saved = productRepository.save(GamePC4);
            Product GamePC5Saved = productRepository.save(GamePC5);

            // add Part objects to the products:
            GamePC1Saved.getParts().add(CPUSaved);
            GamePC2Saved.getParts().add(GPUSaved);
            GamePC3Saved.getParts().add(RAMSaved);
            GamePC4Saved.getParts().add(SSDSaved);
            GamePC5Saved.getParts().add(PSUSaved);

            // add Product objects to the parts:
            CPUSaved.getProducts().add(GamePC1Saved);
            GPUSaved.getProducts().add(GamePC2Saved);
            RAMSaved.getProducts().add(GamePC3Saved);
            SSDSaved.getProducts().add(GamePC4Saved);
            PSUSaved.getProducts().add(GamePC5Saved);

            //save the products:
            productRepository.save(GamePC1Saved);
            productRepository.save(GamePC2Saved);
            productRepository.save(GamePC3Saved);
            productRepository.save(GamePC4Saved);
            productRepository.save(GamePC5Saved);


            System.out.println("Started in Bootstrap");
            System.out.println("Number of Products" + productRepository.count());
            System.out.println(productRepository.findAll());
            System.out.println("Number of Parts" + partRepository.count());
            System.out.println(partRepository.findAll());


        } else {
            System.out.println("The sample inventory is added only when both the part and product lists are empty.");
        }
    }
}

