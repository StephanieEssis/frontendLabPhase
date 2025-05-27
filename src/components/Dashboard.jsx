import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const Dashboard = () => {
  // Données mockées pour le tableau des dernières réservations
  const recentBookings = [
    {
      id: 1,
      client: 'Jean Dupont',
      room: 'Suite Royale',
      checkIn: '2024-03-15',
      checkOut: '2024-03-18',
      status: 'Confirmée',
      total: '240000'
    },
    {
      id: 2,
      client: 'Marie Martin',
      room: 'Chambre Deluxe',
      checkIn: '2024-03-16',
      checkOut: '2024-03-17',
      status: 'En attente',
      total: '75000'
    },
    {
      id: 3,
      client: 'Pierre Dubois',
      room: 'Suite Royale',
      checkIn: '2024-03-20',
      checkOut: '2024-03-22',
      status: 'Confirmée',
      total: '160000'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #9333ea, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold'
      }}>
        Dashboard Administrateur
      </Typography>

      <Grid container spacing={3}>
        {/* Statistiques rapides */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={2}>
                <Card sx={{ bgcolor: '#e3f2fd' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Réservations
                    </Typography>
                    <Typography variant="h4">
                      80
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={2}>
                <Card sx={{ bgcolor: '#e8f5e9' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Revenus Mensuels
                    </Typography>
                    <Typography variant="h4">
                      15,000,000 FCFA
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={2}>
                <Card sx={{ bgcolor: '#fff3e0' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Taux d'Occupation
                    </Typography>
                    <Typography variant="h4">
                      75%
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={2}>
                <Card sx={{ bgcolor: '#fce4ec' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Note Moyenne
                    </Typography>
                    <Typography variant="h4">
                      4.5/5
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Tableau des dernières réservations */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dernières Réservations
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Client</TableCell>
                        <TableCell>Chambre</TableCell>
                        <TableCell>Arrivée</TableCell>
                        <TableCell>Départ</TableCell>
                        <TableCell>Statut</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.client}</TableCell>
                          <TableCell>{booking.room}</TableCell>
                          <TableCell>{booking.checkIn}</TableCell>
                          <TableCell>{booking.checkOut}</TableCell>
                          <TableCell>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.875rem',
                              backgroundColor: booking.status === 'Confirmée' ? '#e8f5e9' : '#fff3e0',
                              color: booking.status === 'Confirmée' ? '#1b5e20' : '#e65100'
                            }}>
                              {booking.status}
                            </span>
                          </TableCell>
                          <TableCell align="right">{parseInt(booking.total).toLocaleString('fr-FR')} FCFA</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Statistiques supplémentaires */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Statistiques Supplémentaires
                </Typography>
                {/* Ajoutez ici d'autres statistiques ou graphiques */}
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 