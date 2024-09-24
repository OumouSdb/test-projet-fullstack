package services;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    public void setup() {
        user = new User(1L, "user@user.com", "Tom", "Sawyer", "tomSecret", false,
                LocalDateTime.of(2023, 9, 24, 14, 30, 0),
                LocalDateTime.of(2023, 9, 24, 14, 30, 0));
    }

    @Test
    public void testFindById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User u = userService.findById(1L);

        assertEquals(1L, u.getId());
        assertEquals("user@user.com", u.getEmail()); // Corrigé pour enlever l'espace
    }

    @Test
    public void testDeleteById() {
        // Préparer le mock pour que findById retourne l'utilisateur
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Appeler la méthode delete sur le service
        userService.delete(1L);

        // Vérifier que deleteById a été appelé sur le repository
        verify(userRepository, times(1)).deleteById(1L);

        // Vérifier que l'utilisateur n'est plus retrouvé
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        User result = userService.findById(1L);
        assertNull(result); // Utilisation de assertNull pour vérifier que l'utilisateur est nul
    }
}
