const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.path}`);
  next();
});

app.use((req, res, next) => {
  if (req.path === '/') {
    return res.sendFile(path.join(__dirname, 'public', 'landing.html'));
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const words = {
  "words": [
    {
      "level": 1,
      "words": [
        {
          "word": "किताब",
          "type": "noun",
          "image": "/images/book.jpg",
          "explanation": "A noun - an object that we read, typically containing pages with text or images",
          "english": "book"
        },
        {
          "word": "खाना",
          "type": "verb",
          "image": "/images/eat.jpg",
          "explanation": "A verb - the action of consuming food",
          "english": "eat"
        },
        {
          "word": "पानी",
          "type": "noun",
          "image": "/images/water.jpg",
          "explanation": "A noun - the clear liquid essential for life",
          "english": "water"
        },
        {
          "word": "सोना",
          "type": "verb",
          "image": "/images/sleep.jpg",
          "explanation": "A verb - the action of resting in an unconscious state",
          "english": "sleep"
        },
        {
          "word": "चलना",
          "type": "verb",
          "image": "/images/walk.jpg",
          "explanation": "A verb - the action of moving on foot",
          "english": "walk"
        },
        {
          "word": "कुर्सी",
          "type": "noun",
          "image": "/images/chair.jpg",
          "explanation": "A noun - a piece of furniture used for sitting",
          "english": "chair"
        },
        {
          "word": "मेज",
          "type": "noun",
          "image": "/images/table.jpg",
          "explanation": "A noun - a piece of furniture with a flat top surface",
          "english": "table"
        },
        {
          "word": "दरवाजा",
          "type": "noun",
          "image": "/images/door.jpg",
          "explanation": "A noun - an entrance or exit point in a wall",
          "english": "door"
        },
        {
          "word": "खेलना",
          "type": "verb",
          "image": "/images/play.jpg",
          "explanation": "A verb - to engage in activity for enjoyment",
          "english": "play"
        },
        {
          "word": "देखना",
          "type": "verb",
          "image": "/images/see.jpg",
          "explanation": "A verb - to perceive with the eyes",
          "english": "see"
        }
      ]
    },
    {
      "level": 2,
      "words": [
        {
          "word": "विद्यालय",
          "type": "noun",
          "image": "/images/school.jpg",
          "explanation": "A noun - an institution for education and learning",
          "english": "school"
        },
        {
          "word": "पढ़ना",
          "type": "verb",
          "image": "/images/read.jpg",
          "explanation": "A verb - to look at and comprehend written words",
          "english": "read"
        },
        {
          "word": "बाज़ार",
          "type": "noun",
          "image": "/images/market.jpg",
          "explanation": "A noun - a place where goods are bought and sold",
          "english": "market"
        },
        {
          "word": "लिखना",
          "type": "verb",
          "image": "/images/write.jpg",
          "explanation": "A verb - to form letters or words on a surface",
          "english": "write"
        },
        {
          "word": "दोस्त",
          "type": "noun",
          "image": "/images/friend.jpg",
          "explanation": "A noun - a person with whom one has a bond of mutual affection",
          "english": "friend"
        },
        {
          "word": "खिड़की",
          "type": "noun",
          "image": "/images/window.jpg",
          "explanation": "A noun - an opening in a wall that allows light and air",
          "english": "window"
        },
        {
          "word": "बोलना",
          "type": "verb",
          "image": "/images/speak.jpg",
          "explanation": "A verb - to express thoughts through speech",
          "english": "speak"
        },
        {
          "word": "परिवार",
          "type": "noun",
          "image": "/images/family.jpg",
          "explanation": "A noun - a group of people who are related by blood or marriage",
          "english": "family"
        },
        {
          "word": "सुनना",
          "type": "verb",
          "image": "/images/listen.jpg",
          "explanation": "A verb - to perceive sounds with the ears",
          "english": "listen"
        },
        {
          "word": "काम",
          "type": "noun",
          "image": "/images/work.jpg",
          "explanation": "A noun - activity involving mental or physical effort",
          "english": "work"
        }
      ]
    },
    {
      "level": 3,
      "words": [
        {
          "word": "व्याकरण",
          "type": "noun",
          "image": "/images/grammar.jpg",
          "explanation": "A noun - the system and structure of a language",
          "english": "grammar"
        },
        {
          "word": "समझना",
          "type": "verb",
          "image": "/images/understand.jpg",
          "explanation": "A verb - to comprehend or grasp the meaning",
          "english": "understand"
        },
        {
          "word": "विश्वविद्यालय",
          "type": "noun",
          "image": "/images/university.jpg",
          "explanation": "A noun - an institution of higher education",
          "english": "university"
        },
        {
          "word": "अध्ययन",
          "type": "noun",
          "image": "/images/study.jpg",
          "explanation": "A noun - the process of learning and understanding",
          "english": "study"
        },
        {
          "word": "प्रश्न",
          "type": "noun",
          "image": "/images/question.jpg",
          "explanation": "A noun - a sentence worded to elicit information",
          "english": "question"
        },
        {
          "word": "विचार",
          "type": "noun",
          "image": "/images/thought.jpg",
          "explanation": "A noun - an idea or opinion produced by thinking",
          "english": "thought"
        },
        {
          "word": "व्यवसाय",
          "type": "noun",
          "image": "/images/business.jpg",
          "explanation": "A noun - commercial activity or trade",
          "english": "business"
        },
        {
          "word": "सहायता",
          "type": "noun",
          "image": "/images/help.jpg",
          "explanation": "A noun - assistance or support given to someone",
          "english": "help"
        },
        {
          "word": "निर्णय",
          "type": "noun",
          "image": "/images/decision.jpg",
          "explanation": "A noun - a conclusion or resolution reached after consideration",
          "english": "decision"
        },
        {
          "word": "प्रगति",
          "type": "noun",
          "image": "/images/progress.jpg",
          "explanation": "A noun - development towards an improved situation",
          "english": "progress"
        }
      ]
    },
    {
      "level": 4,
      "words": [
        {
          "word": "अनुसंधान",
          "type": "noun",
          "image": "/images/research.jpg",
          "explanation": "A noun - systematic investigation to establish facts",
          "english": "research"
        },
        {
          "word": "विश्लेषण",
          "type": "noun",
          "image": "/images/analysis.jpg",
          "explanation": "A noun - detailed examination of elements or structure",
          "english": "analysis"
        },
        {
          "word": "प्रयोग",
          "type": "noun",
          "image": "/images/experiment.jpg",
          "explanation": "A noun - a scientific procedure to make a discovery",
          "english": "experiment"
        },
        {
          "word": "सिद्धांत",
          "type": "noun",
          "image": "/images/theory.jpg",
          "explanation": "A noun - a system of ideas explaining something",
          "english": "theory"
        },
        {
          "word": "अवधारणा",
          "type": "noun",
          "image": "/images/concept.jpg",
          "explanation": "A noun - an abstract idea or general notion",
          "english": "concept"
        },
        {
          "word": "प्रतिक्रिया",
          "type": "noun",
          "image": "/images/reaction.jpg",
          "explanation": "A noun - a response to a situation or stimulus",
          "english": "reaction"
        },
        {
          "word": "कार्यान्वयन",
          "type": "noun",
          "image": "/images/implementation.jpg",
          "explanation": "A noun - the process of putting a decision or plan into effect",
          "english": "implementation"
        },
        {
          "word": "समाधान",
          "type": "noun",
          "image": "/images/solution.jpg",
          "explanation": "A noun - a means of solving a problem or dealing with a difficulty",
          "english": "solution"
        }
      ]
    }
  ]
};

app.get('/api/words', (_, res) => {
  res.json(words);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});