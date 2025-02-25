import xml.etree.ElementTree as ET

def convert_dbm_to_drawio(dbm_file, output_xml):
    tree = ET.parse(dbm_file)
    root = tree.getroot()
    
    drawio_root = ET.Element("mxfile")
    root_elem = ET.SubElement(drawio_root, "root")
    ET.SubElement(root_elem, "mxCell", id="0")
    ET.SubElement(root_elem, "mxCell", id="1", parent="0")
    
    table_id = 2
    for table in root.findall("table"):
        table_name = table.get("name")
        table_elem = ET.SubElement(root_elem, "mxCell", 
                                   id=str(table_id), 
                                   value=f"Tabela: {table_name}", 
                                   style="shape=rectangle;", 
                                   vertex="1", 
                                   parent="1")
        ET.SubElement(table_elem, "mxGeometry", x="100", y=str(100 * table_id), width="160", height="80", as_="geometry")
        
        col_id = table_id + 1
        for column in table.findall("column"):
            column_name = column.get("name")
            column_type = column.find("type").get("name")
            ET.SubElement(root_elem, "mxCell", 
                          id=str(col_id), 
                          value=f"{column_name}: {column_type}", 
                          vertex="1", 
                          parent=str(table_id))
            col_id += 1
        
        table_id = col_id + 1
    
    tree = ET.ElementTree(drawio_root)
    tree.write(output_xml, encoding="utf-8", xml_declaration=True)
    
    print(f"Arquivo XML para draw.io gerado: {output_xml}")

# Uso: 
convert_dbm_to_drawio("D://Users//rapha//OneDrive//UFJF//02 - Modelagem de Sistemas//Trabalho//trabalho-modelagem//Documentos//db-diagrama.dbm", "D://Users//rapha//OneDrive//UFJF//02 - Modelagem de Sistemas//Trabalho//trabalho-modelagem//Documentos//db-diagrama.xml")