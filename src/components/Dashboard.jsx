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
  TableRow,
  Divider,
  Container
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Enregistrer les composants ChartJS nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

  // Données pour le graphique en ligne (évolution des réservations)
  const lineChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Réservations',
        data: [65, 59, 80, 81, 56, 85],
        borderColor: '#9333ea',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Données pour le graphique en barres (revenus mensuels)
  const barChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Revenus (FCFA)',
        data: [12000000, 15000000, 18000000, 14000000, 16000000, 20000000],
        backgroundColor: [
          'rgba(147, 51, 234, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(147, 51, 234, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(147, 51, 234, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
      }
    ]
  };

  // Données pour le graphique circulaire (types de chambres)
  const pieChartData = {
    labels: ['Suite Royale', 'Chambre Deluxe', 'Chambre Éco Chic'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: [
          'rgba(147, 51, 234, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(99, 102, 241, 0.7)',
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(99, 102, 241, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  // Options communes pour les graphiques
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  // Options spécifiques pour le graphique en ligne
  const lineChartOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            background: 'linear-gradient(45deg, #9333ea, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3
          }}
        >
          Dashboard Administrateur
        </Typography>

        {/* Statistiques rapides */}
        <Grid container spacing={3} sx={{ mb: 4, width: '100%' }}>
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Total Réservations
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    80
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Revenus Mensuels
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                    15,000,000 FCFA
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <Card sx={{ bgcolor: '#fff3e0', height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Taux d'Occupation
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                    75%
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <Card sx={{ bgcolor: '#fce4ec', height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Note Moyenne
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d81b60' }}>
                    4.5/5
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>

        {/* Tableau et Graphiques */}
        <Grid container spacing={3}>
          {/* Tableau des dernières réservations */}
          <Grid sx={{ gridColumn: { xs: 'span 12', lg: 'span 8' } }}>
            <Paper 
              elevation={3}
              sx={{ 
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <Card>
                <CardContent>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      borderBottom: '2px solid #9333ea',
                      pb: 1,
                      mb: 2
                    }}
                  >
                    Dernières Réservations
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Client</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Chambre</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Arrivée</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Départ</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }} align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentBookings.map((booking) => (
                          <TableRow 
                            key={booking.id}
                            sx={{ 
                              '&:hover': { 
                                bgcolor: 'rgba(147, 51, 234, 0.04)'
                              }
                            }}
                          >
                            <TableCell>{booking.client}</TableCell>
                            <TableCell>{booking.room}</TableCell>
                            <TableCell>{booking.checkIn}</TableCell>
                            <TableCell>{booking.checkOut}</TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'inline-block',
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: '12px',
                                  fontSize: '0.875rem',
                                  fontWeight: 'medium',
                                  bgcolor: booking.status === 'Confirmée' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(237, 108, 2, 0.1)',
                                  color: booking.status === 'Confirmée' ? '#1b5e20' : '#e65100'
                                }}
                              >
                                {booking.status}
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              {parseInt(booking.total).toLocaleString('fr-FR')} FCFA
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {/* Statistiques supplémentaires avec graphiques */}
          <Grid sx={{ gridColumn: { xs: 'span 12', lg: 'span 4' } }}>
            <Paper 
              elevation={3}
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      borderBottom: '2px solid #9333ea',
                      pb: 1,
                      mb: 2
                    }}
                  >
                    Statistiques Détaillées
                  </Typography>

                  {/* Graphique en ligne - Évolution des réservations */}
                  <Box sx={{ height: 200, mb: 4 }}>
                    <Typography 
                      variant="subtitle2" 
                      gutterBottom
                      sx={{ 
                        color: '#666',
                        fontWeight: 'medium'
                      }}
                    >
                      Évolution des réservations
                    </Typography>
                    <Line data={lineChartData} options={lineChartOptions} />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Graphique en barres - Revenus mensuels */}
                  <Box sx={{ height: 200, mb: 4 }}>
                    <Typography 
                      variant="subtitle2" 
                      gutterBottom
                      sx={{ 
                        color: '#666',
                        fontWeight: 'medium'
                      }}
                    >
                      Revenus mensuels
                    </Typography>
                    <Bar data={barChartData} options={commonOptions} />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Graphique circulaire - Types de chambres */}
                  <Box sx={{ height: 200 }}>
                    <Typography 
                      variant="subtitle2" 
                      gutterBottom
                      sx={{ 
                        color: '#666',
                        fontWeight: 'medium'
                      }}
                    >
                      Répartition des types de chambres
                    </Typography>
                    <Pie data={pieChartData} options={commonOptions} />
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;