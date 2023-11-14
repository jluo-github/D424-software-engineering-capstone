package com.example.demo.service;

import com.example.demo.domain.Part;
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
public class PDFPartService {

  public void export(List<Part> partList, HttpServletResponse response) throws IOException {

    Document document = new Document(PageSize.A4);

    PdfWriter.getInstance(document, response.getOutputStream());

    document.open();

    Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
    fontTitle.setSize(18);
    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
    String currentDateTime = dateFormatter.format(new Date());
    String title = "Parts Report " + currentDateTime;
    Paragraph paragraph = new Paragraph(title, fontTitle);
    paragraph.setAlignment(Paragraph.ALIGN_CENTER);

    document.add(paragraph);

    PdfPTable table = new PdfPTable(5);


    table.setWidthPercentage(100f);
//    table.setWidths(new float[]{1.5f, 3.5f, 3.0f, 3.0f, 1.5f});
    table.setSpacingBefore(10);
    partHeader(table);
    partData(table, partList);

    document.add(table);

    document.close();
  }

  private void partData(PdfPTable table, List<Part> partList) {
    for (Part part : partList) {

      table.addCell(part.getName());
      table.addCell(String.valueOf(part.getPrice()));
      table.addCell(String.valueOf(part.getInv()));
      table.addCell(String.valueOf(part.getMax()));
      table.addCell(String.valueOf(part.getMin()));

    }
  }

  private void partHeader(PdfPTable table) {
    PdfPCell cell = new PdfPCell();
    cell.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);

    cell.setBackgroundColor(Color.LIGHT_GRAY);
    cell.setPadding(5);

    Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
    font.setColor(Color.BLACK);

    cell.setPhrase(new Phrase("Name", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Price", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Inventory", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Max Inventory", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Min Inventory", font));
    table.addCell(cell);
  }
}
