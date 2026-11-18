from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_ALIGN_VERTICAL, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path('/tmp/core-website-guide-assets')
OUTPUT = ROOT / 'Vanprasthi_Samiti_Website_Guide.docx'

FOREST = '123B22'
FOREST_DARK = '0B2C16'
SAFFRON = 'E88400'
CREAM = 'FDF9F2'
LIGHT_GREEN = 'EAF3EC'
LIGHT_GRAY = 'F5F5F5'
MID_GRAY = '5B6573'
BLACK = '000000'
WHITE = 'FFFFFF'
BORDER = 'D9D9D9'


def set_cell_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn('w:shd'))
    if shd is None:
        shd = OxmlElement('w:shd')
        tc_pr.append(shd)
    shd.set(qn('w:fill'), fill)


def set_cell_border(cell, color=BORDER, size='6'):
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in('w:tcBorders')
    if borders is None:
        borders = OxmlElement('w:tcBorders')
        tc_pr.append(borders)
    for edge in ('top', 'left', 'bottom', 'right'):
        tag = qn(f'w:{edge}')
        element = borders.find(tag)
        if element is None:
            element = OxmlElement(f'w:{edge}')
            borders.append(element)
        element.set(qn('w:val'), 'single')
        element.set(qn('w:sz'), size)
        element.set(qn('w:color'), color)


def set_cell_margin(cell, top=100, start=130, bottom=100, end=130):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in('w:tcMar')
    if tc_mar is None:
        tc_mar = OxmlElement('w:tcMar')
        tc_pr.append(tc_mar)
    for key, value in (('top', top), ('start', start), ('bottom', bottom), ('end', end)):
        node = tc_mar.find(qn(f'w:{key}'))
        if node is None:
            node = OxmlElement(f'w:{key}')
            tc_mar.append(node)
        node.set(qn('w:w'), str(value))
        node.set(qn('w:type'), 'dxa')


def style_run(run, size=None, color=BLACK, bold=None, italic=None):
    font = run.font
    font.name = 'Arial'
    font._element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
    if size is not None:
        font.size = Pt(size)
    font.color.rgb = RGBColor.from_string(color)
    if bold is not None:
        font.bold = bold
    if italic is not None:
        font.italic = italic


def remove_title_rule(paragraph):
    p_pr = paragraph._p.get_or_add_pPr()
    p_bdr = p_pr.find(qn('w:pBdr'))
    if p_bdr is None:
        p_bdr = OxmlElement('w:pBdr')
        p_pr.append(p_bdr)
    bottom = p_bdr.find(qn('w:bottom'))
    if bottom is None:
        bottom = OxmlElement('w:bottom')
        p_bdr.append(bottom)
    bottom.set(qn('w:val'), 'nil')


def setup_document():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.67)
    section.bottom_margin = Inches(0.62)
    section.left_margin = Inches(0.7)
    section.right_margin = Inches(0.7)
    section.header_distance = Inches(0.25)
    section.footer_distance = Inches(0.3)

    normal = doc.styles['Normal']
    normal.font.name = 'Arial'
    normal._element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
    normal.font.size = Pt(11)
    normal.font.color.rgb = RGBColor.from_string(BLACK)
    normal.paragraph_format.space_after = Pt(7)
    normal.paragraph_format.line_spacing = 1.14

    title = doc.styles['Title']
    title.font.name = 'Arial'
    title._element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
    title.font.size = Pt(25)
    title.font.bold = True
    title.font.color.rgb = RGBColor.from_string(BLACK)
    title.paragraph_format.space_before = Pt(18)
    title.paragraph_format.space_after = Pt(4)
    title_p_pr = title._element.get_or_add_pPr()
    title_p_bdr = title_p_pr.find(qn('w:pBdr'))
    if title_p_bdr is not None:
        title_p_pr.remove(title_p_bdr)

    for name, size in (('Heading 1', 17), ('Heading 2', 13)):
        style = doc.styles[name]
        style.font.name = 'Arial'
        style._element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
        style.font.size = Pt(size)
        style.font.bold = True
        style.font.color.rgb = RGBColor.from_string(BLACK)
        style.paragraph_format.space_before = Pt(11)
        style.paragraph_format.space_after = Pt(5)
        style.paragraph_format.keep_with_next = True

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = footer.add_run('Vanprasthi Samiti Website Guide')
    style_run(run, size=8.5, color=MID_GRAY)
    return doc


def add_paragraph(doc, text='', bold_lead=None, after=7):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after)
    if bold_lead and text.startswith(bold_lead):
        lead = p.add_run(bold_lead)
        style_run(lead, bold=True)
        remainder = p.add_run(text[len(bold_lead):])
        style_run(remainder)
    else:
        run = p.add_run(text)
        style_run(run)
    return p


def add_bullet(doc, text):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(text)
    style_run(run)
    return p


def add_number(doc, number, title, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    lead = p.add_run(f'{number}. {title} ')
    style_run(lead, bold=True)
    rest = p.add_run(text)
    style_run(rest)
    return p


def add_caption(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(6)
    run = p.add_run(text)
    style_run(run, size=9, color=MID_GRAY, italic=True)


def add_screenshot(doc, filename, caption, width=6.5):
    path = ASSETS / filename
    if not path.exists():
        raise FileNotFoundError(f'Missing screenshot: {path}')
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(0)
    p.add_run().add_picture(str(path), width=Inches(width))
    add_caption(doc, caption)


def add_page_heading(doc, title, intro):
    h = doc.add_paragraph(style='Heading 1')
    h_run = h.add_run(title)
    style_run(h_run, size=17, bold=True)
    add_paragraph(doc, intro, after=8)


def add_page_table(doc):
    rows = [
        ('Home', 'Start here. It explains the organisation and introduces the four main areas of work.'),
        ('About Us', 'Read the organisation story, registered details, and the idea of Vanprastha service.'),
        ('Our Mission', 'See the mission and vision in plain language.'),
        ('Our Work', 'Open a card to learn about cleanliness, education, anti corruption awareness, or community help.'),
        ('Events', 'Check upcoming programmes. Open an event and use the registration option if you plan to attend.'),
        ('Gallery and News', 'View photos and read updates from the organisation.'),
        ('Contact Us', 'Find the office details or send a message through the online form.'),
    ]
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.style = 'Table Grid'
    widths = (Inches(1.55), Inches(5.0))
    for index, (cell, text) in enumerate(zip(table.rows[0].cells, ('Page', 'What you can do there'))):
        set_cell_shading(cell, FOREST)
        set_cell_border(cell)
        set_cell_margin(cell)
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        cell.width = widths[index]
        p = cell.paragraphs[0]
        run = p.add_run(text)
        style_run(run, size=10.5, color=WHITE, bold=True)
    for index, (page, purpose) in enumerate(rows):
        cells = table.add_row().cells
        fill = WHITE if index % 2 == 0 else LIGHT_GRAY
        for cell in cells:
            set_cell_shading(cell, fill)
            set_cell_border(cell)
            set_cell_margin(cell)
            cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        p0 = cells[0].paragraphs[0]
        r0 = p0.add_run(page)
        style_run(r0, size=10, bold=True)
        p1 = cells[1].paragraphs[0]
        r1 = p1.add_run(purpose)
        style_run(r1, size=10)
    return table


def create_document():
    doc = setup_document()

    title = doc.add_paragraph(style='Title')
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    remove_title_rule(title)
    run = title.add_run('Vanprasthi Samiti Website Guide')
    style_run(run, size=25, bold=True)

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subtitle.paragraph_format.space_after = Pt(12)
    run = subtitle.add_run('A simple guide for visitors of every age')
    style_run(run, size=12, color=MID_GRAY)

    add_paragraph(
        doc,
        'This website explains the work of Vanprasthi Jan Jagriti Abhiyan Samiti in Roorkee. It helps visitors learn about the organisation, its activities, upcoming events, and ways to get in touch. You do not need computer experience to use it. Read one section at a time and use the top menu to move around.'
    )
    add_page_heading(doc, 'Start in Three Easy Steps', 'The website opens on the Home page. Use these steps whenever you visit.')
    add_number(doc, 1, 'Choose a language.', 'Use the Hindi or English button in the top bar. The page will change to your chosen language.')
    add_number(doc, 2, 'Pick a menu item.', 'The menu at the top takes you to Home, About Us, Our Mission, Our Work, Events, Gallery, and Contact Us.')
    add_number(doc, 3, 'Read or take action.', 'Open a work area for details, check an event date, or use the Contact page when you need help.')
    add_screenshot(doc, 'home.png', 'Screenshot 1  The Home page gives a quick introduction and shows the main menu')

    doc.add_page_break()
    add_page_heading(doc, 'Finding What You Need', 'Every page has one simple purpose. The table below shows where to go.')
    add_page_table(doc)
    add_page_heading(doc, 'Helpful Reading Tips', 'The website is designed to be read at your own pace.')
    add_bullet(doc, 'If the words look small, increase the browser zoom. On a computer, press Command and Plus on a Mac or Control and Plus on Windows.')
    add_bullet(doc, 'The top menu stays available as you move through the website. Select Home whenever you want to start again.')
    add_bullet(doc, 'If you are helping an older family member, choose the language first and read the page headings aloud. The headings tell you what each page is about.')
    add_paragraph(doc, 'The website also includes policy and transparency pages. These are useful when you want to read official information, website rules, or contact related details.')

    doc.add_page_break()
    add_page_heading(doc, 'Understanding the Main Work', 'The Our Work page explains the four main social activities of the organisation. Each card has a short description and a Learn More link.')
    add_screenshot(doc, 'our-work.png', 'Screenshot 2  The Our Work page shows the four main activity areas', width=6.45)
    add_bullet(doc, 'Cleanliness work covers local cleanup, waste guidance, and awareness about healthy surroundings.')
    add_bullet(doc, 'Social education work supports respect for elders, education for children, and awareness against harmful beliefs.')
    add_bullet(doc, 'Anti corruption awareness helps people understand their rights, duties, and the value of transparency.')
    add_bullet(doc, 'Community service helps people who need support and points eligible families towards welfare schemes.')

    doc.add_page_break()
    add_page_heading(doc, 'Checking Events', 'Use the Events page to see programmes that are coming soon or have already taken place. Each event card shows its topic, date, time, and location.')
    add_screenshot(doc, 'events.png', 'Screenshot 3  Event cards show the date time location and registration option', width=6.45)
    add_number(doc, 1, 'Read the event card.', 'Check the date, time, and place before you decide to attend.')
    add_number(doc, 2, 'Choose the registration option.', 'Use it only when you want to join that specific programme.')
    add_number(doc, 3, 'Enter details carefully.', 'Give a name and contact details that the organisation can use to respond about the event.')
    add_paragraph(doc, 'If you are unsure about an event, use the Contact page or the phone numbers shown on the website before travelling.')

    doc.add_page_break()
    add_page_heading(doc, 'Contacting the Organisation', 'The Contact page is the best place to ask a question, share a message, or find the office contact details.')
    add_screenshot(doc, 'contact.png', 'Screenshot 4  The Contact page shows office details and a simple message form', width=6.45)
    add_number(doc, 1, 'Read the contact information.', 'The left side shows the address, phone numbers, and email address.')
    add_number(doc, 2, 'Fill in the form.', 'Enter your name, email address, phone number if you want to share it, a short subject, and your message.')
    add_number(doc, 3, 'Send the message.', 'Press Send Message after checking that your name, email, and message are correct.')
    add_paragraph(doc, 'Do not include bank details, passwords, one time codes, or other private information in the message form. Use the form only for ordinary questions or requests for help.')

    doc.add_page_break()
    add_page_heading(doc, 'About the Organisation', 'The About Us page explains the organisation identity, its official registration details, and the idea of service through experience. The Our Mission page gives a short explanation of the mission and vision.')
    add_paragraph(doc, 'The Gallery page keeps photographs from activities. The News page shares updates and articles. The transparency and policy pages provide supporting information for visitors who need to read official material.')
    add_page_heading(doc, 'For Website Staff', 'The Admin CMS link is for authorised team members only. It gives staff access to areas for managing events, gallery items, news, documents, campaigns, donations, and volunteer information. Do not share staff passwords with visitors.')
    add_page_heading(doc, 'A Short Reminder', 'Use the website in the language that feels easiest. Take your time with the menu, and use Contact Us whenever a page does not answer your question.')

    doc.core_properties.title = 'Vanprasthi Samiti Website Guide'
    doc.core_properties.subject = 'Plain language guide to the Vanprasthi Samiti website'
    doc.core_properties.author = 'Vanprasthi Jan Jagriti Abhiyan Samiti'
    doc.save(OUTPUT)
    print(OUTPUT)


if __name__ == '__main__':
    create_document()
