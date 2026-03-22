'use client'
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ContactFormSchema, type ContactFormInput } from '@/schemas/contact.schema';

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});

  const handleChange =
    (field: keyof ContactFormInput) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = ContactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof ContactFormInput, string>
      > = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormInput;
        if (field) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.log('Form válido:', result.data);
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        backgroundColor: '#ECECEC',
        py: { xs: 3, md: 7 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 3, sm: 4, md: 6 },
        }}
      >
        <Breadcrumbs
          separator={<ChevronRightIcon sx={{ fontSize: 22, color: '#6B6B6B' }} />}
          aria-label="breadcrumb"
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Link
            underline="none"
            href="#"
            sx={{
              color: '#6B6B6B',
              fontSize: { xs: '1.1rem', md: '1rem' },
              fontWeight: 400,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Home
          </Link>

          <Typography
            sx={{
              color: '#1F1F1F',
              fontSize: { xs: '1.1rem', md: '1rem' },
              fontWeight: 700,
            }}
          >
            Contato
          </Typography>
        </Breadcrumbs>

        <Typography
          component="h1"
          sx={{
            color: '#1F1F1F',
            fontWeight: 800,
            fontSize: { xs: '2.25rem', sm: '2.5rem', md: '2.1rem' },
            lineHeight: 1.1,
            mb: { xs: 3, md: 2 },
          }}
        >
          Contato
        </Typography>

        <Typography
          sx={{
            color: '#666666',
            fontSize: { xs: '1.15rem', sm: '1.3rem', md: '1.05rem' },
            lineHeight: 1.5,
            maxWidth: 760,
            mb: 3,
          }}
        >
          Envie sua mensagem, sugestão ou dúvida. Responderemos o mais breve possível.
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 2.5 },
            maxWidth: 560,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Nome *"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            placeholder=""
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon
                      sx={{
                        color: '#7A7A7A',
                        fontSize: { xs: 32, md: 28 },
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: '#666666',
                fontSize: { xs: '1rem', md: '0.95rem' },
              },
              '& .MuiOutlinedInput-root': {
                minHeight: 56,
                borderRadius: '16px',
                backgroundColor: 'transparent',
                alignItems: { xs: 'center', md: 'center' },
                '& fieldset': {
                  borderColor: '#B8B8B8',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#A8A8A8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D71943',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#1F1F1F',
                fontSize: '1rem',
                py: 1.8,
              },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="E-mail *"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            placeholder=""
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon
                      sx={{
                        color: '#7A7A7A',
                        fontSize: 28,
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: '#666666',
                fontSize: { xs: '1rem', md: '0.95rem' },
              },
              '& .MuiOutlinedInput-root': {
                minHeight: 56,
                borderRadius: '16px',
                backgroundColor: 'transparent',
                '& fieldset': {
                  borderColor: '#B8B8B8',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#A8A8A8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D71943',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#1F1F1F',
                fontSize: '1rem',
                py: 1.8,
              },
            }}
          />

          <TextField
            fullWidth
            multiline
            minRows={5}
            variant="outlined"
            label="Mensagem *"
            value={formData.message}
            onChange={handleChange('message')}
            error={!!errors.message}
            helperText={errors.message}
            placeholder=""
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      alignSelf: 'flex-start',
                      mt: 1.8,
                    }}
                  >
                    <MessageOutlinedIcon
                      sx={{
                        color: '#7A7A7A',
                        fontSize: 28,
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: '#666666',
                fontSize: { xs: '1rem', md: '0.95rem' },
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: 'transparent',
                alignItems: 'flex-start',
                '& fieldset': {
                  borderColor: '#B8B8B8',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#A8A8A8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D71943',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#1F1F1F',
                fontSize: '1rem',
                py: { xs: 2.3, md: 1.8 },
              },
              '& .MuiInputBase-inputMultiline': {
                minHeight: { xs: 30, md: 50 },
              },
            }}
          />

          <Box sx={{ pt: { xs: 1, md: 0.5 } }}>
            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{
                minWidth: 172,
                minHeight: 42,
                px: 3,
                borderRadius: { xs: '16px', md: '8px' },
                backgroundColor: '#D71943',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '0.95rem' },
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                '&:hover': {
                  backgroundColor: '#BE153B',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.22)',
                },
              }}
            >
              Enviar mensagem
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
