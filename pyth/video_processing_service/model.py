from enum import Enum
from typing import List, Literal, Optional
from pydantic import BaseModel
from pydantic.schema import schema

# Equivalent/intended rust definition
# 
# enum TextbookElement {
#     Paragraph(String),
#     Figure {
#         image_url: String,
#         caption: Option<String>
#     },
#     Heading(String)
#     Section {
#         contents: Vec<TextbookElement>
#     }
# }

class TextbookElementKindEnum(str, Enum):
    PARAGRAPH = "paragraph"
    FIGURE = "figure"
    HEADING = "heading"
    SECTION = "section"


class TextbookElement(BaseModel):
    kind: TextbookElementKindEnum
    timestamp: float

class ParagraphSegment(BaseModel):
    text: str
    timestamp: float
    speaker_tag: str

class Paragraph(TextbookElement):
    kind: Literal[TextbookElementKindEnum.PARAGRAPH] = TextbookElementKindEnum.PARAGRAPH
    contents: List[ParagraphSegment]

class Figure(TextbookElement):
    kind: Literal[TextbookElementKindEnum.FIGURE] = TextbookElementKindEnum.FIGURE
    image_url: str
    caption: Optional[str]

class Heading(TextbookElement):
    kind: Literal[TextbookElementKindEnum.HEADING] = TextbookElementKindEnum.HEADING
    text: str

class Section(TextbookElement):
    kind: Literal[TextbookElementKindEnum.SECTION] = TextbookElementKindEnum.SECTION
    contents: List[TextbookElement]

textbook_schema = schema([
    TextbookElement,
    ParagraphSegment,
    Paragraph,
    Figure,
    Heading,
    Section
], title="textbook schema stuff")
