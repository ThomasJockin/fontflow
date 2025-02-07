"use client"
import React, {createContext, useContext, useState, useEffect, useMemo} from "react";
import lodash from "lodash";

const DataContext = createContext();

const options = {

    
    // Content Array
    
    chunk: [
'Beyond the Stars Exploring Alien Worlds:  Discover the latest in exoplanet research and space exploration. Astronomy Hall, Room 202    March 14, 6:00 PM',
    
'The Psychology of Happiness: Unlock the secrets to well-being and mental resilience. Behavioral Sciences Auditorium February 20, 5:30 PM ',

'Coding the Future: A look at AI’s impact on society and industry. Engineering Building, Lecture Hall 1 April 5, 4:00 PM  ',
    
 'The Art of Renaissance Innovation: How creativity shaped science and culture in the 15th century. Fine Arts Center, Studio 3 March 28, 7:00 PM',
    
 'Sustainable Cities, Sustainable Futures: Designing urban spaces for a changing planet. Environmental Sciences Building, Room 110 April 10, 3:30 PM',
    
'Crime and Cybersecurity: Understanding the threats of the digital age. Law School, Room 305 March 21, 6:00 PM ',

'The Language of Film: Unpacking storytelling through cinema’s greatest works. Humanities Building, Screening Room  April 15, 7:30 PM ',
    
'The Biology of Superpowers: Could comic book heroes exist in the real world? Biology Lab Annex, Room A12 March 30, 5:00 PM',

'Economics in the Age of Cryptocurrencies: What blockchain means for global markets. Business School, Auditorium 2 April 7, 2:00 PM',
    
'The History of Everyday Objects: How mundane inventions changed the course of history. History Department, Room 104 February 25, 5:00 PM'
    
    ],
    
    // General Poster Arrays
    
    layoutOptions: [
"Radial", "Symmetrical", "Asymmetrical", "Grid-based", "Z-pattern", "F-pattern", "Vertical", "Horizontal", "Diagonal", "Triangular", "Circular", "Modular", "Masonry", "Freeform", "Stacked", "Spiral", "L-shaped", "T-shaped", "X-shaped", "Centralized", "Justified", "Split-screen", "Pyramid", "Banded", "Column", "Row", "Overlapping", "Layered", "Grid with whitespace", "Card-based", "Unordered", "Floating", "Brick pattern", "Checkerboard", "Staggered", "Wave", "Diagonal stripes", "Checker", "Concentric circles", "Diagonal lines", "Floating elements", "Split sections", "V-shaped", "W-shaped", "Radiating", "Overlay", "Center-aligned", "Grid with irregular cells", "Mirrored", "Wrap-around", "Diagonal flow", "Nested", "Inverted triangle", "Hexagonal", "Circular grid", "Grid with offset", "Exaggerated margins", "Uneven distribution", "Horizontal stacking", "Vertical stacking", "Vertical symmetry", "Free-flowing", "Parallel", "Off-center", "Side-by-side", "Tiled", "Organic", "Floating blocks", "Ladder", "Equal space", "Dynamic grid", "Intersecting lines", "Non-linear", "Organic curve", "Framing", "Minimal", "Overlap with transparency", "Staggered rows", "Folded", "Dynamic spiral", "Fragmented", "Angular", "Collapsing grid", "Columnar", "Alternating", "Multi-layer", "Repetitive pattern", "Mirrored halves", "Randomized", "Dual sections", "Focal point-centered", "Zig-zag", "Crossed elements", "Segmented", "Radial balance", "Exploded view", "Interwoven", "Inset framing", "Layered grid", "Balanced"
],
    
    actionOptions: [
"Burnt", "Cut", "Folded", "Shattered", "Sliced", "Chopped", "Pushed", "Pulled", "Twisted", "Bent", "Stretched", "Stabbed", "Scratched", "Shredded", "Dropped", "Threw", "Caught", "Tripped", "Hit", "Kicked", "Tapped", "Smacked", "Shaken", "Shoved", "Lifted", "Carried", "Dragged", "Tossed", "Flicked", "Patted", "Pressed", "Bumped", "Clashed", "Snapped", "Ripped", "Spun", "Wiped", "Painted", "Cleaned", "Scrubbed", "Pounded", "Hammered", "Cutting", "Dug", "Scored", "Raked", "Squeezed", "Shovelled", "Spilled", "Unwrapped", "Stitched", "Tied", "Untangled", "Jerked", "Yanked", "Unfolded", "Swung", "Whipped", "Poked", "Pricked", "Tapped", "Smacked", "Grazed", "Licked", "Shined", "Licked", "Tugged", "Ripped", "Torn", "Drenched", "Squeezed", "Stripped", "Zipped", "Zipped up", "Hacked", "Burned", "Mended", "Wounded", "Cracked", "Squashed", "Bent", "Blocked", "Trapped", "Snatched", "Grabbed", "Pinched", "Clipped", "Stabbed", "Massaged", "Caressed", "Kneaded", "Pressed", "Throttled", "Rapped", "Boxed", "Hurt", "Tackled", "Grabbed", "Slashed", "Severed", "Snipped", "Maimed", "Nipped", "Tensed", "Sliced", "Punched", "Slapped", "Flicked", "Hammered", "Sawed", "Brushed", "Scraped", "Lacerated", "Torn apart", "Wrenched", "Repaired", "Tipped", "Frayed", "Tattered", "Coiled", "Swatted", "Chipped", "Scratched", "Ravaged", "Disrupted", "Crushed", "Destroyed", "Splintered"
],
    
   vibeOptions: [

"Something out of the Arts and Crafts Movement", "Something like Bauhaus School", "Something made by Antoni Gaudí in Art Nouveau", "Something out of De Stijl Movement", "Something like Russian Constructivism", "Something made by Pablo Picasso in Abstract Expressionism", "Something out of Dadaism", "Something like Minimalism", "Something made by Le Corbusier in Modernism", "Something out of Postmodernism", "Something like Brutalism", "Something made by Mies van der Rohe in International Style", "Something out of Art Deco", "Something like Futurism", "Something made by Charles Rennie Mackintosh in Glasgow Style", "Something out of the Gothic Revival", "Something like Baroque Art", "Something made by Louis Comfort Tiffany in Rococo Style", "Something out of Victorian Design", "Something like Vienna Secession", "Something made by Piet Mondrian in Swiss Design", "Something out of Russian Suprematism", "Something like Pop Art", "Something made by Charles and Ray Eames in American Modernism", "Something out of Frank Lloyd Wright’s Prairie Style", "Something made by Coco Chanel in Fashion Design", "Something like Florence Knoll’s Modernism", "Something out of Mid-Century Modernism", "Something made by David Salle in Postmodern Art", "Something like Zaha Hadid’s Designs", "Something out of Georgian Architecture", "Something like Classical Architecture", "Something made by Alphonse Mucha in Art Nouveau", "Something out of Le Corbusier’s Designs", "Something like Vera Wang’s Fashion", "Something made by Isamu Noguchi in Sculpture", "Something out of Pop Art by Andy Warhol", "Something like Eileen Gray’s Designs", "Something made by Arne Jacobsen in Furniture Design", "Something out of Dutch Golden Age Design", "Something like Mannerism in Art", "Something made by Caravaggio in Baroque Art", "Something out of Early Renaissance Design", "Something like Bauhaus School by Walter Gropius", "Something made by Piet Mondrian in Dutch Abstract Art", "Something out of Expressionism in Design", "Something like Robert Venturi's Postmodern Architecture", "Something made by Marcel Breuer in Furniture Design", "Something out of Art Deco by René Lalique", "Something like Michael Graves’ Designs", "Something made by Issey Miyake in Fashion", "Something out of Futurism by Giacomo Balla", "Something like the Memphis Group's Design", "Something made by Jean-Michel Basquiat in Neo-Expressionism", "Something out of Ukiyo-e Japanese Prints", "Something like Tamara de Lempicka’s Art Deco", "Something made by Ruth Asawa in Sculpture", "Something out of High Tech Architecture by Richard Rogers", "Something like Dieter Rams’ Industrial Design", "Something made by Tadao Ando in Minimalist Architecture", "Something out of American Arts and Crafts Movement", "Something like the Aesthetic Movement Design", "Something made by Massimo Vignelli in Graphic Design", "Something out of Scandinavian Modern Design", "Something like the Arts and Crafts Movement", "Something made by Gerrit Rietveld in Modernist Architecture", "Something out of Neo-Gothic Architecture", "Something like Paul Klee’s Abstract Art", "Something made by Joe Colombo in Industrial Design", "Something out of Modernist Typography by Herbert Bayer", "Something like the Memphis Group’s Furniture", "Something made by Salvador Dalí in Surrealist Design", "Something out of the Bauhaus Typography by Herbert Bayer", "Something like Frank Gehry’s Architecture", "Something made by Zaha Hadid in Fluid Architecture", "Something out of Minimalist Design by Tadao Ando", "Something like the Russian Constructivism in Architecture", "Something made by Florence Knoll in Modern Interior Design", "Something out of Post-Impressionist Designs by Van Gogh", "Something like Abstract Art by Wassily Kandinsky", "Something made by Zaha Hadid in Architecture", "Something out of the Art Deco Movement", "Something like Jackson Pollock’s Art in Design", "Something made by Isamu Noguchi in Sculptural Design", "Something out of the Bauhaus Movement", "Something like Frank Lloyd Wright’s Organic Architecture", "Something made by Mies van der Rohe in Modern Architecture", "Something out of Art Nouveau by Hector Guimard", "Something like Italian Futurism in Design", "Something made by Dieter Rams in Industrial Design", "Something out of Brutalism by Paul Rudolph", "Something like William Morris’s Arts and Crafts", "Something made by Charles Eames in Furniture", "Something out of the Swiss Design Movement", "Something like the Vienna Secession in Art", "Something made by Arne Jacobsen in Modernist Design", "Something out of Futurism in Design", "Something like Modernist Graphics by Paul Rand", "Something made by Marcel Breuer in Bauhaus Furniture", "Something out of the Minimalist Art Movement", "Something like Eero Saarinen's Designs", "Something made by Robert Rauschenberg in Pop Art", "Something out of Neo-Classical Architecture", "Something like Abstract Expressionism by Mark Rothko", "Something made by Jean Arp in Sculpture", "Something out of Constructivist Art by El Lissitzky", "Something like the High-Tech Design of Richard Rogers", "Something made by Frank Gehry in Deconstructivist Architecture", "Something out of the Design of Tadao Ando", "Something like the Furniture Designs by Hans Wegner", "Something made by Florence Knoll in Interior Design"
],
        // Typeface Array
    fontOptions: [
"Roboto Serif", "Roboto Serif Italic", "Open Sans", "Open Sans Condensed", "Open Sans Italic", "Lora", "Lora Italic", "Lora Bold", "Merriweather", "Merriweather Italic", "Merriweather Bold", "Montserrat", "Montserrat Alternates", "Montserrat Subrayada", "Poppins", "Poppins Italic", "Raleway", "Raleway Light", "Raleway Thin", "Oswald", "Oswald Light", "Lobster", "Lobster Two", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono", "Noto Sans", "Noto Serif", "Noto Sans Italic", "Source Sans Pro", "Source Serif Pro", "Source Sans Pro Bold", "Playfair Display", "Playfair Display Italic", "Quicksand", "Quicksand Bold", "Anton", "Anton Bold", "Fira Sans", "Fira Mono", "Fira Sans Condensed", "Fira Sans Extra Condensed", "Josefin Sans", "Josefin Slab", "Josefin Sans SemiBold", "Dancing Script", "Dancing Script Bold", "Pacifico", "Pacifico Regular", "Titillium Web", "Titillium Web SemiBold", "Crimson Text", "Crimson Pro", "Crimson Text Bold", "Crimson Text Italic", "Cabin", "Cabin Condensed", "Barlow", "Barlow Condensed", "Barlow Semi Condensed", "Inter", "Inter ExtraBold", "Inter Italic", "Vollkorn", "Vollkorn SC", "Mulish", "Mulish Bold", "Mulish Italic", "Work Sans", "Work Sans Medium", "DM Sans", "DM Serif Text", "DM Mono", "DM Sans Bold", "Bebas Neue", "Exo 2", "Exo 2 Light", "Exo 2 Bold", "Manrope", "Heebo", "Heebo Bold", "Mukta", "Mukta Malar", "Mukta SemiBold", "Mulish", "Mulish Regular", "Mulish Light", "Righteous", "Righteous Bold", "Abril Fatface", "Abril Fatface Regular", "Bitter", "Bitter Italic", "Cardo", "Cardo Italic", "Cormorant", "Cormorant Garamond", "Cormorant Upright", "Alegreya", "Alegreya Italic", "Alegreya Light", "Alegreya Sans", "Alegreya Sans Italic", "Alegreya SC", "Alegreya SC Light", "Signika", "Signika Negative", "Signika Bold", "Teko", "Spectral", "Spectral SC", "Varela Round", "Tisa", "Tisa Bold", "Arapey", "Karla", "Karla Regular", "Baloo", "Oxygen", "Oxygen Italic", "Ubuntu Condensed", "Dosis", "Dosis Light", "Candal", "Catamaran", "Krona One", "Bree Serif", "Bree Serif Bold", "Abel", "Cabin Sketch", "Cabin Sketch Italic", "Quattrocento", "Quattrocento Sans", "Cousine", "Cedarville Cursive", "Brawler", "Russo One", "Khand", "Zilla Slab", "Alfa Slab One", "Bubbler One", "Ropa Sans", "Maven Pro", "Paytone One", "Rationale", "Ruluko", "Shadows Into Light", "Satisfy", "Zilla Slab Highlight", "Nunito", "Nunito Light", "Hammersmith One", "Viga", "Viga Regular", "Rasa", "Overpass", "Overpass Condensed", "Open Sans Condensed", "Permanent Marker", "Sanchez", "Cairo", "Noto Sans JP", "Piedra", "Mukta", "Arvo", "Arvo Italic", "Arvo Bold", "Archivo Narrow", "Vollkorn SC", "Mada", "Syncopate", "Piedra", "Any Sans Serif", "Any Modern Serif", "Any Transitional Serif", "Any Slab Serif", "Any Oldstyle Serif", "Any Fatface Serif", "Any Didone Serif", "Any Scotch Serif", "Any Geometric Sans Serif", "Any Rounded Sans Serif", "Any Humanist Sans Serif", "Any Groteque Sans Serif", "Any Superellipse Sans Serif", "Any Glyphic Sans Serif", "Any Script Font", "Any Informal Script Font", "Any Formal Script Font", "Any Handwriting Font"
    
],
    
         // Typography Arrays applied to both Headline and Subhead
    
    ratioOptions: [
"double", "triple", "quadruple", "quintuple", "half", "one third", "one fourth", "one fifth", "one sixth", "one eighth", "one tenth", "thrice", "fourfold", "tenfold", "hundredth"
],
    
    fontProperity: [
    "weight", "width", "slant", "construction", "size", "line height", "letter spacing", "word spacing", "color", "underline", "case", "alignment", "opacity", "shadow", "contrast"
],
    
    
    // Headline Arrays
    
    sentenceOptions:[
    "article", "noun", "verb", "adjective", "preposition", "conjunction", "clause", "phrase", "subject", "modifier", "first word","last word", "every other word", "first letter", "last letter", "every other letter"
    ],
    
    // Subhead Arrays
    
    contentOptions: [
    "header",
    "venue",
    "date and time"]
    
};
        


        
export const DataProvider = ({children}) => {
    //reads the data
    const [data, setData] = useState({})
    //writes the data
    function randomSelect() {
    setData(
    {chunk:lodash.sample(options.chunk), 
     relation: lodash.sample(options.ratioOptions), 
     layout: lodash.sample(options.layoutOptions), attribute:lodash.sample(options.fontProperity), headerfont:lodash.sample(options.fontOptions), subheadfont:lodash.sample(options.fontOptions), vibe:lodash.sample(options.vibeOptions), action:lodash.sample(options.actionOptions), fontProperity:lodash.sample(options.fontProperity), langObject:lodash.sample(options.sentenceOptions), content:lodash.sample(options.contentOptions)}
    );
    };

    
    useEffect(randomSelect, []);
    
    
        // we're creating an object, thr left is the name of the variable, the right side is the function name
    
    //const stuff = useMemo(
    //() => {return({data:data, setData:setData})}, 
        //[data]
    //)
    return (
    <DataContext.Provider value = {{data,setData}}>
          {children}
    </DataContext.Provider>
    
    );
};

export const useData = () => useContext(DataContext);