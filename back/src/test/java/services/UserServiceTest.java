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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
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
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        userService.delete(1L);

        verify(userRepository, times(1)).deleteById(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        User result = userService.findById(1L);
        assertNull(result);
    }

    @Test
    public void testFindAll() {
        List<User> users = Arrays.asList(
                new User(1L, "user1@user.com", "John", "Doe", "johnSecret", false,
                        LocalDateTime.of(2023, 9, 24, 14, 30, 0),
                        LocalDateTime.of(2023, 9, 24, 14, 30, 0)),
                new User(2L, "user2@user.com", "Jane", "Doe", "janeSecret", false,
                        LocalDateTime.of(2023, 9, 25, 14, 30, 0),
                        LocalDateTime.of(2023, 9, 25, 14, 30, 0))
        );

        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userRepository.findAll();

        assertEquals(2, result.size());
        assertEquals("user1@user.com", result.get(0).getEmail());
        assertEquals("user2@user.com", result.get(1).getEmail());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void testUpdateUser() {
        User updatedUser = new User(1L, "user@user.com", "Tom", "Sawyer", "newSecret", false,
                LocalDateTime.of(2023, 9, 24, 14, 30, 0),
                LocalDateTime.of(2023, 10, 1, 14, 30, 0));

        when(userRepository.save(updatedUser)).thenReturn(updatedUser);

        User result = userRepository.save(updatedUser);

        assertEquals("newSecret", result.getPassword());
        assertEquals(LocalDateTime.of(2023, 10, 1, 14, 30, 0), result.getUpdatedAt());

        verify(userRepository, times(1)).save(updatedUser);
    }

}
