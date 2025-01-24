import { Request, Response, NextFunction } from 'express';
import Document from '../models/Document';

const checkDocumentAccess = async (req: Request, res: Response, next: NextFunction) => {
  const documentId = req.params.id;
  const userId = req.user?.id;
  
  try {
    const document = await Document.findById(documentId).populate('teamAccess');
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check if the user is the owner or is shared the document
    if (document.uploadedBy.toString() === userId || document.teamAccess.some(user => user._id.toString() === userId)) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export default checkDocumentAccess;
