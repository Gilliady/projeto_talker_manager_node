const validateToken = ({ headers }, res, next) => {
  try {
    if (!headers.authorization) {
      throw new Error('Token não encontrado');
    }
    if (headers.authorization.length !== 16
      || typeof headers.authorization !== 'string') {
      throw new Error('Token inválido');
    }
    return next();
  } catch (e) {
    return res.status(401)
      .json({ message: e.message });
  }
};

const validateName = ({ body }, res, next) => {
  try {
    if (!body.name) {
      throw new Error('O campo "name" é obrigatório');
    }
    if ((body.name.length < 3)) {
      throw new Error('O "name" deve ter pelo menos 3 caracteres');
    }
    return next();
  } catch (e) {
    return res.status(400)
      .json({ message: e.message });
  }
};

const validateAge = ({ body }, res, next) => {
  try {
    if (!body.age) {
      throw new Error('O campo "age" é obrigatório');
    }
      if (body.age < 18
        || !Number.isInteger(body.age)) {
          throw new Error('O campo "age" deve ser um número inteiro igual ou maior que 18');
        }
        return next();
  } catch (e) {
    return res.status(400)
      .json({ message: e.message });
  }
};

const validateTalk = ({ body }, res, next) => {
  try {
    if (!body.talk) {
      throw new Error('O campo "talk" é obrigatório');
    }
    return next();
  } catch (e) {
    return res.status(400)
      .json({ message: e.message });
  }
};
const validateDate = (date) => {
  const [day, month, year] = date.split('/');
  const isDay = Number(day) >= Number('01') && Number(day[0]) <= 31;
  const isMonth = Number(month) >= Number('01') && Number(month) <= 12;
  const isYear = Number(year) >= 999;
  return isDay && isMonth && isYear;
};

const validateWatchedAt = ({ body }, res, next) => {
  try {
    if (!body.talk.watchedAt) {
      throw new Error('O campo "watchedAt" é obrigatório');
    }
      if (!validateDate(body.talk.watchedAt)) {
        throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
      }
      return next();
  } catch (e) {
    return res.status(400)
      .json({ message: e.message });
  }
};

const isBetween = (number, min, max) => (+number >= min && +number <= max);

const validateRate = ({ body }, res, next) => {
  const { talk } = body;
  try {
    if (talk.rate === undefined) {
      throw new Error('O campo "rate" é obrigatório');
    }
    if (!Number.isInteger(talk.rate) || !isBetween(talk.rate, 1, 5)) {
        throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
      }
      return next();
  } catch (e) {
    return res.status(400)
      .json({ message: e.message });
  }
};

const validateRateOnSearch = ({ query }, res, next) => {
  try {
    const { rate = 3 } = query;
    if ((!Number.isInteger(Number(rate)) || !isBetween(rate, 1, 5))) {
      throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
    }
    return next();
  } catch (e) {
    return res.status(400)
      .json({ message: e.message });
  }
};
const validateNewTalker = [
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateRateOnSearch,
];
module.exports = { validateNewTalker };