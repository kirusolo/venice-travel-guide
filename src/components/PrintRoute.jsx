import React, { useRef } from 'react';
import { Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PrintRoute = ({ route }) => {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    
    // Create canvas from the route details
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${route.title.replace(/\s+/g, '-').toLowerCase()}-route.pdf`);
  };

  return (
    <div>
      {/* Print Buttons */}
      <div className="flex gap-3 mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          <Printer size={20} />
          Print Route
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          <Download size={20} />
          Download PDF
        </button>
      </div>

      {/* Printable Content */}
      <div ref={printRef} className="print:block">
        {/* This will be captured for PDF */}
      </div>
    </div>
  );
};

export default PrintRoute;