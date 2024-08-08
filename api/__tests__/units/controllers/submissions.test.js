const { create, show } = require('../../../controllers/submissions');
const Submission = require('../../../models/Submission');


jest.mock('../../../models/Submission');

describe('Submission Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('show', () => {
    it('should return an array of question statistics', async () => {
      const mockStats = [{ question_id: 1, question_description: 'Sample question', percentage_correct: 75 }];
      Submission.getQuestionsStats.mockResolvedValue(mockStats);

    
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Call the controller function
      await show({}, res);

      // Assertions
      expect(Submission.getQuestionsStats).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ stats: mockStats });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      Submission.getQuestionsStats.mockRejectedValue(new Error(errorMessage));

      // Mock the response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Call the controller function
      await show({}, res);

      // Assertions
      expect(Submission.getQuestionsStats).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('create', () => {
    it('should create a new submission', async () => {
      const mockSubmissionData = { user_id: 1, question_id: 1, outcome: true };
      const createdSubmission = { ...mockSubmissionData, submission_id: 1 };
      Submission.create.mockResolvedValue(createdSubmission);

      // Mock the request and response objects
      const req = { body: mockSubmissionData, user: 1 };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Call the controller function
      await create(req, res);

      // Assertions
      expect(Submission.create).toHaveBeenCalledWith({ ...mockSubmissionData, user_id: 1 });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ newSubmission: createdSubmission });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Creation error';
      Submission.create.mockRejectedValue(new Error(errorMessage));

      // Mock the request and response objects
      const req = { body: { user_id: 1, question_id: 1, outcome: true }, user: 1 };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Call the controller function
      await create(req, res);

      // Assertions
      expect(Submission.create).toHaveBeenCalledWith({ ...req.body, user_id: 1 });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
