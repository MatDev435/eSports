import React from 'react';
import { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';

import { Heading } from '../Heading';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopping, setIsCopping] = useState<boolean>(false);

    async function handleCopyDiscord() {
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Usuário copiado!', 'Cole esse texto no Discord para encontrar essa pessoa.');
        setIsCopping(false);
    }

    return (
        <Modal
            statusBarTranslucent
            transparent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <AntDesign
                        name='checkcircleo'
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                    />

                    <Heading
                        title="Let's play!"
                        subtitle='Agora é só começar a jogar!'
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text
                        style={styles.label}
                    >
                        Adicione seu Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscord}
                        disabled={isCopping}
                    >
                        <Text
                            style={styles.discord}
                        >
                            { isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}