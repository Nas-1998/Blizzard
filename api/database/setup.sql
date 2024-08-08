
DROP TABLE IF EXISTS submission;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username TEXT UNIQUE  NOT NULL,
  password TEXT NOT NULL,
  highscore INT,
  role VARCHAR(50),
  PRIMARY KEY(user_id)
);

CREATE TABLE characters (
  character_id INT GENERATED ALWAYS AS IDENTITY,
  character_name TEXT,
  birth_year VARCHAR(255),
  image_url TEXT,
  PRIMARY KEY(character_id)
);

CREATE TABLE events (
  event_id INT GENERATED ALWAYS AS IDENTITY,
  character_id INT,
  event_date VARCHAR(50),
  bg_image_url TEXT,
  char_image_url TEXT,
  PRIMARY KEY(event_id),
  FOREIGN KEY (character_id) REFERENCES characters(character_id)
);

CREATE TABLE answers (
  answer_id INT GENERATED ALWAYS AS IDENTITY,
  answer_text TEXT NOT NULL,
  question_id INT,
  PRIMARY KEY(answer_id)
);

CREATE TABLE question (
  question_id INT GENERATED ALWAYS AS IDENTITY,
  question_description TEXT,
  answer_id INT,
  event_id INT,
  score INT,
<<<<<<< HEAD
  answer_description  VARCHAR(600),
=======
  answer_description  TEXT,
>>>>>>> dev
  PRIMARY KEY(question_id),
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id),
  FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE submission (
  submission_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT,
  question_id INT,
  outcome BOOLEAN,
  PRIMARY KEY(submission_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (question_id) REFERENCES question(question_id)
);

INSERT INTO characters (character_name, birth_year, image_url) 
VALUES
('Julius Caesar', '100 BC', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/miniceaser.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWluaWNlYXNlci5qcGVnIiwiaWF0IjoxNzIzMTAzNzA4LCJleHAiOjE3NTQ2Mzk3MDh9.p3wVzzZzh7iefsnskShusYNviuDktpyIG73ocIqI2bM&t=2024-08-08T07%3A55%3A08.548Z'),
('Cleopatra', '69 BC', ''),
('Alexander the great', '356 BC', ''),
('Placeholder', '', '');

INSERT INTO events (character_id, event_date, bg_image_url, char_image_url) 
VALUES 
(1, '60 BCE', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event1-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQxLWJnLmpwZyIsImlhdCI6MTcyMzA0MzQzNSwiZXhwIjoxNzU0NTc5NDM1fQ.IyHbl924DSoEz2Kw_Zar89QugWH6obw_mWYYbjt4JhI&t=2024-08-07T15%3A10%3A35.686Z', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event1-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQxLWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNDQ2LCJleHAiOjE3NTQ1Nzk0NDZ9.RzjHSALckItmrJdPnCYt3_MoadO12yNJfnr0o5z45-k&t=2024-08-07T15%3A10%3A46.883Z'),
(1, '58 BCE', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event2-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQyLWJnLmpwZyIsImlhdCI6MTcyMzA0MzQ1NywiZXhwIjoxNzU0NTc5NDU3fQ.NUkGFFUWfk_wDZyZCJAeJ9VnHZsWzZniL5y3Kk6CSuQ&t=2024-08-07T15%3A10%3A57.944Z', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event2-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQyLWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNDY1LCJleHAiOjE3NTQ1Nzk0NjV9.SZPoN7vB43thRXWnAPOWxi4LwwSbtoQmA0pdr6x1dws&t=2024-08-07T15%3A11%3A05.840Z'),
(1, '49BCE', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event3-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQzLWJnLmpwZyIsImlhdCI6MTcyMzA0MzQ3NCwiZXhwIjoxNzU0NTc5NDc0fQ.YX06v0-Y59ZizB9XvI3VFS3DR894Of1S7oOF4UcnAzg&t=2024-08-07T15%3A11%3A14.088Z', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event3-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQzLWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNTA2LCJleHAiOjE3NTQ1Nzk1MDZ9.Zlx5lUPwPgEzT7_Y6zCO05qZGjuxQdgqWTCQLZ19bn8&t=2024-08-07T15%3A11%3A46.420Z'),
(1, '48BCE', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event4-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ0LWJnLmpwZyIsImlhdCI6MTcyMzA0MzUxOSwiZXhwIjoxNzU0NTc5NTE5fQ.5vYey4QklrrjnuvjULPmkZ3ogc6W40XH2FbS5oxteOA&t=2024-08-07T15%3A11%3A58.943Z', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event4-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ0LWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNTQ5LCJleHAiOjE3NTQ1Nzk1NDl9.z12VRSt8-sPWPkAs-CAOXBAOH3zb6lsFfubvWSM9xZo&t=2024-08-07T15%3A12%3A29.429Z'),
(1, '44BCE', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event5-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ1LWJnLmpwZyIsImlhdCI6MTcyMzA0MzU3NywiZXhwIjoxNzU0NTc5NTc3fQ.HwrFqBhM0Aa_KsKxFyPwlxKSo6gQ3RiOCi5Dl6MW7G8&t=2024-08-07T15%3A12%3A57.831Z', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event5-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ1LWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNTg1LCJleHAiOjE3NTQ1Nzk1ODV9.u09rOElTp5ca_Olatg92mQBCQCFQHJA8Y4bQtrc3VGc&t=2024-08-07T15%3A13%3A05.521Z'),
(1, '44BCE', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event6-bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ2LWJnLmpwZyIsImlhdCI6MTcyMzA0MzU5NCwiZXhwIjoxNzU0NTc5NTk0fQ.Mg0RKvxo_i09fiyjofCINy5hasRv31Y5D0WGNBMlCQg&t=2024-08-07T15%3A13%3A14.318Z', 'https://mbwxnezvgzfbldgfkvim.supabase.co/storage/v1/object/sign/images/event6-char.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXZlbnQ2LWNoYXIucG5nIiwiaWF0IjoxNzIzMDQzNjA0LCJleHAiOjE3NTQ1Nzk2MDR9.EzEeG0pfQfuMGgYjKNJ3fd9Lut4SOj5SuNO1ubCEXV4&t=2024-08-07T15%3A13%3A23.886Z');


 

INSERT INTO answers (answer_text, question_id) 
VALUES 
  ('Side with Pompey, that way he gains further military power through his help.', 1),
  ('Form an alliance with Crassus to gain further wealth and influence over the land, allowing him to garner further support later.', 1),
  ('Take the chance in forming an alliance with both men which could be risky.', 1),
  ('Begin waging war against the Germanic warlords to expand Rome’s power and dominance.', 2),
  ('Use your previous diplomacy skills to make treaties and alliances with the Germanic tribes that could benefit the empire.', 2),
  ('Forget the idea of conquest with the Germanic tribes and lands and turn eastwards instead where there is more to be gained for the empire.', 2),
  ('Obey the senate’s orders and return home, it’s been a long journey and many battles have been fought, it’s time to retire and rest in glory.', 3),
  ('You have always been a diplomatic man and only shown strength when needed, you might have some allies in Rome who could help, why not reach out.', 3),
  ('We must cross the Rubicon and prepare for war; there is no other option.', 3),
  ('Accept her request and assist her in securing her power over Egypt and see where this new alliance takes you.', 4),
  ('Give her to her brother; he is the one that currently holds power and would most likely be very grateful to you.', 4),
  ('You find out Ptolemy has killed Pompey; there is no point in remaining in Egypt when a civil war continues.', 4),
  ('Reduce the senate’s power and increase its membership with your loyalists.', 5),
  ('Completely shut it down and let your army take control over Rome under your rule.', 5),
  ('Allow for new members to be elected but reduce the number of senior positions.', 5),
  ('Exile them both and never allow them to return to Rome; this is an act of mercy.', 6),
  ('Pardon them and give them back their status as noble men.', 6),
  ('Execute them both and show the others your power so they may never turn against you.', 6);
  
  

INSERT INTO question (question_description, answer_id, event_id, score, answer_description)
VALUES 
('It is 60 BCE, Rome conflicts with itself, various leaders looking to seize control for themselves. Ceaser comes up with a plan to form an alliance with another leader to boost his own power and control over the empire, some leaders which Ceaser looks to are Pompey the great and Crassus.', 
 1, 1, 10, 'Julius Caesar formed a Triumvirate where he was able to garner both military support and wealth through both
  men thus allowing him more power, dominance, and influence over Rome, eventually securing the governorship over Gaul and 
  advancing his military career.'),
('It is 58 BCE, Ceaser is now the governor of Gaul and is tasked with expanding the empire further; in doing so he must wage various military campaigns across regions of western and central Europe. Ceaser knows that if he begins conquest, it will be long and painful especially with the many Germanic warlords and tribes, he must famous, all boasting power and strength',
  2, 2, 10, 'Julius Caesar decided to wage war against the Germanic warlords as
   expanding territory would lead to more wealth and power for Caesar, helping him gain dominance. 
   The resources he gains would be vital in his plans to challenge his political opponents back in Rome.
    Caesar began by engaging the Helvetii tribe who were migrating through
     Roman territory, and this first move was his way of showing dominance over the region
      and securing the loyalty of his allies for the Gallic wars that lasted 8 years.'),
('It is 49 BCE, Ceaser has gained much glory and power from the success of his conquests and your advisement, however, now begins a turning point in his life. Back in Rome, Caesar’s once ally turned rival Pompey has influenced the Senate to turn on him by ordering him to disband his army and retire in Rome as a mere citizen. He now faces a pivotal moment that can affect the future of the empire. It is your job to advise him on the best course of action:',
  3, 3, 10, 'They have all turned on you, only your soldiers are loyal to you. Caesar knew a day like this would come, and so he is ready for civil war and to take the fight to those who turned on him. By crossing the Rubicon with his army, it allowed him to leverage his military strength and also marked a point of no return against the largest power in the world.'),
('It is 48 BCE, Ceaser travels to Egypt, the civil war has begun, and he hunts for Pompey, it is on his arrival that he realises Egypt is also in a turmoil with itself as Cleopatra VII is in a power struggle with her brother Ptolemy XIII. At some moment Cleopatra appears in his presence undetected to ask for his help in securing her power over her brother. Ceaser is presented with an incredible opportunity here that would allow him to expand his dominion and influence.',
  4, 4, 10, 'You decide to go forward with her request and help her defeat Ptolemy by going to war against him as well. In doing so, parts of Egypt are ruined, including the great library of Alexandria. However, with the success of the war, Cleopatra becomes Pharaoh, and you begin your relationship with her, two of the strongest rulers in the Mediterranean and the world. She also has Caesar’s child and moves to Rome with him.'),
('It is 44 BCE, Ceaser has now won the civil war and gained a lot of power, more than anyone else in the empire, for a while Ceaser has sought to reshape Rome and the senate which he deemed himself to be above, he has now become permanent dictator of Rome and has for a while been driving reforms whether distributing land among veterans and poor or create debt reliefs. Ceaser must now decide on how he handles the senate, this is crucial in keeping his power and stopping any threat to it.',
  5, 5, 10, 'The role of the Senate is becoming meaningless to Caesar as he now holds more power than he ever did, especially as permanent dictator. He must slowly reduce its power and increase his hold on the entire republic of Rome strategically so as not to create any conflict. The best way to do this is using his power and influence to put loyalists in majority positions, as they will follow him and not question his authority.'),
('It is 44 BCE, During the civil war Ceaser faced many different enemies including many members of the roman senate, he had the opportunity to punish many of them at different opportunities. However, he sees that a better path might be clemency and gaining trust of his former enemies instead of punishing them for their betrayal against him for he all he had achieved for Rome. In such an important moment he now must decide the fate of former senate members Brutus and Cassius.',
  6, 6, 10, 'Your goal has been the reshaping of Rome itself, and for that, you need more support and allies than enemies. Making peace is the better solution, especially for the public to see a leader of unity and forgiveness as well as strength. Both men now are in your service and owe you their lives.');
  


