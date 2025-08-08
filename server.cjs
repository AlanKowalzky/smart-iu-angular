// @ts-nocheck
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom login endpoint
server.post('/api/user/login', (req, res) => {
  const { userName, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ userName, password }).value();
  
  if (user) {
    res.json({ token: user.token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Custom profile endpoint
server.get('/api/user/profile', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const db = router.db;
  const user = db.get('users').find({ token }).value();
  
  if (user) {
    res.json({ fullName: user.fullName, initials: user.initials });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Custom dashboards endpoint
server.get('/api/dashboards', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const db = router.db;
  const user = db.get('users').find({ token }).value();
  
  if (user) {
    const dashboards = db.get('dashboards').map(d => ({
      id: d.id,
      title: d.title,
      icon: d.icon
    })).value();
    res.json(dashboards);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Custom dashboard details endpoint
server.get('/api/dashboards/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const db = router.db;
  const user = db.get('users').find({ token }).value();
  
  if (user) {
    const dashboard = db.get('dashboards').find({ id: req.params.id }).value();
    if (dashboard) {
      res.json({ tabs: dashboard.tabs });
    } else {
      res.status(404).json({ error: 'Dashboard not found' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

server.use('/api', router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});