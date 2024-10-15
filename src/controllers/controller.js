import BaseModel from "#models/model.js";

export const getController = async (req, res) => {
  try {
    const models = await BaseModel.find({});

    return res.status(200).json(models);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "Id not found" });
    }

    const model = await BaseModel.findById(id);

    return res.status(200).json(model);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const postController = async (req, res) => {
  try {
    const { name, content } = req.body;

    if (!name || !content) {
      return res.status(404).json({ error: "Data not found" });
    }

    const model = new BaseModel({ name, content });

    await model.save();

    return res.status(201).json(model);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const patchController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;

    if (!id) {
      return res.status(404).json({ error: "Id not found" });
    }

    if (!name || !content) {
      return res.status(404).json({ error: "Data not found" });
    }

    const model = await BaseModel.findByIdAndUpdate(id, { name, content });

    return res.status(200).json(model);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "Id not found" });
    }

    await BaseModel.findByIdAndDelete(id);

    return res.status(204).json({ message: "Model deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
