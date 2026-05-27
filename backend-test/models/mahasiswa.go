package models

type Mahasiswa struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Nama     string `json:"nama"`
	Umur     int    `json:"umur"`
	NIM      string `json:"nim"`
	TglLahir string `json:"tgl_lahir"`
	Alamat   string `json:"alamat"`

	JurusanID uint `json:"jurusan_id"`

	Jurusan Jurusan `json:"jurusan" gorm:"foreignKey:JurusanID"`
}
