/** Centi Catalog public catalog fallback. Deploy as a Web App if needed.
 * Script Properties: SPREADSHEET_ID, SHEET_GID.
 */
function doGet(e) {
  try {
    return output_({ ok: true, rows: readCatalog_() });
  } catch (err) {
    return output_({ ok: false, error: String(err.message || err) });
  }
}
function readCatalog_() {
  const p = PropertiesService.getScriptProperties();
  const id = p.getProperty('SPREADSHEET_ID');
  const gid = String(p.getProperty('SHEET_GID') || '0');
  if (!id) throw new Error('SPREADSHEET_ID is not configured');
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheets().filter(s => String(s.getSheetId()) === gid)[0];
  if (!sheet) throw new Error('Sheet tab gid ' + gid + ' was not found');
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  const headers = values[0].map(x => String(x).trim().toLowerCase());
  const ix = name => headers.indexOf(name.toLowerCase());
  const sku=ix('sku'), short=ix('nama pendek'), image=ix('images'), notes=ix('notes'), price=ix('regular price'), name=ix('name'), variation=ix('variation');
  if (sku < 0 || price < 0) throw new Error('Required headers SKU and regular price are missing');
  return values.slice(1).filter(r=>r[sku]).map(r=>({sku:String(r[sku]),short:short<0?'':String(r[short]),image:image<0?'':String(r[image]),notes:notes<0?'':String(r[notes]),price:Number(String(r[price]||'').replace(/[^0-9.-]/g,''))||0,name:name<0?'':String(r[name]),variation:variation<0?'':String(r[variation])}));
}
function output_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
