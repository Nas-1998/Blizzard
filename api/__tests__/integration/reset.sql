ALTER TABLE submission DROP CONSTRAINT submission_user_id_fkey;
ALTER TABLE submission DROP CONSTRAINT submission_question_id_fkey;
ALTER TABLE question DROP CONSTRAINT question_answer_id_fkey;
ALTER TABLE question DROP CONSTRAINT question_event_id_fkey;
ALTER TABLE events DROP CONSTRAINT events_character_id_fkey;

TRUNCATE TABLE submission, question, answers, events, characters, users RESTART IDENTITY;

ALTER TABLE submission ADD CONSTRAINT submission_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE submission ADD CONSTRAINT submission_question_id_fkey FOREIGN KEY (question_id) REFERENCES question(question_id);
ALTER TABLE question ADD CONSTRAINT question_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES answers(answer_id);
ALTER TABLE question ADD CONSTRAINT question_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);
ALTER TABLE events ADD CONSTRAINT events_character_id_fkey FOREIGN KEY (character_id) REFERENCES characters(character_id);




INSERT INTO characters (character_name, birth_year, image_url) 
VALUES
('Julius Caesar', '100 BC', 'url1'),
('Cleopatra', '69 BC', 'url2'),
('Alexander the great', '356 BC', 'url3');


INSERT INTO events (character_id, event_date, bg_image_url, char_image_url) 
VALUES 
(1, '60 BCE', '',''),
(1, '58 BCE', '',''),
(1, '49BCE', '',''),
(2, '48BCE', '',''),
(2, '44BCE', '',''),
(2, '44BCE', '','');


INSERT INTO answers (answer_text, question_id) 
VALUES 
  ('Answer 1 to question 1', 1),
  ('Answer 2 to question 1', 1),
  ('Answer 3 to question 1', 1),
  ('Answer 1 to question 2', 2),
  ('Answer 2 to question 2', 2),
  ('Answer 3 to question 2', 2),
  ('Answer 1 to question 3', 3),
  ('Answer 2 to question 3', 3),
  ('Answer 3 to question 3', 3),
  ('Answer 1 to question 4', 4),
  ('Answer 2 to question 4', 4),
  ('Answer 3 to question 4', 4);
 
  
INSERT INTO question (question_description, answer_id, event_id, score, answer_description)
VALUES 
(1,1,1,10,'Question description event id 1'),
(1,1,2,10,'Question description event id 2'),
(1,1,3,10,'Question description event id 3');