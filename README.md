Assumptions:
Clinician knows who they are interviewing and what type of client they are working with. Clinician will need access to all data following the session, including duration and type. Clinician will edit the final note to be according to the specifications they need and they will no longer need the draft note after submitting a note.

Approach:

I decided to focus on core features that would be of importance to ABA clinicians.

Requirements:

- Allow input of text
- Allow input of duration
- Allow input of type
- Allow AI generated output
- Allow editing and saving of AI generated output
- Allow viewing of saved generated output

Non-functional requirements:
- Testing
- Modular code

I decided that I needed an entity to store a note. I had this entity hold value, type, and duration. Potentially in future iterations we could store an id.

API Endpoints:

/ai_summary POST Given a drafted note, generate an AI optimized version of this note

/save POST Given a final note, save this note

/notes GET Get a list of notes

I stored these notes in memory for the time being, though in the future, I would want to hook this up to a database.

I added three tests, one for the simple healthy check, one for saving notes, and one for getting notes. I would add an additional test for ai_summary featuring stubbing of the openai client, however I did not get to that.

Improvements for future iterations:
- Custom time input
- Custom type input
- Have option for bulleted entry in the text field

There's much more I would do in the realm of code quality, however I figured this was a good MVP.