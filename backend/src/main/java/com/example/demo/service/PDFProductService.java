package com.example.demo.service;

import com.example.demo.domain.Product;
import com.lowagie.text.Font;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PDFProductService {

  public void export(List<Product> productList, HttpServletResponse response) throws IOException {

    Document document = new Document(PageSize.A4);

    PdfWriter.getInstance(document, response.getOutputStream());

    document.open();

    Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
    fontTitle.setSize(18);
    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
    String currentDateTime = dateFormatter.format(new Date());
    String title = "Products Report " + currentDateTime;
    Paragraph paragraph = new Paragraph(title, fontTitle);
    paragraph.setAlignment(Paragraph.ALIGN_CENTER);

    document.add(paragraph);

    PdfPTable table = new PdfPTable(3);
    table.setWidthPercentage(100f);
    table.setWidths(new float[]{1.5f, 3.5f, 3.0f});
    table.setSpacingBefore(10);
    productHeader(table);
    productData(table, productList);

    document.add(table);

    document.close();
  }

  private void productData(PdfPTable table, List<Product> productList) {
    for (Product product : productList) {

      table.addCell(product.getName());
      table.addCell(String.valueOf(product.getPrice()));
      table.addCell(String.valueOf(product.getInv()));
    }
  }

  private void productHeader(PdfPTable table) {
    PdfPCell cell = new PdfPCell();
    cell.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);

    cell.setBackgroundColor(Color.LIGHT_GRAY);
    cell.setPadding(5);

    Font font = FontFactory.getFont(FontFactory.HELVETICA);
    font.setColor(Color.BLACK);

    cell.setPhrase(new Phrase("Name", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Price", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Inventory", font));
    table.addCell(cell);
  }


}
